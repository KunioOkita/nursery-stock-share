/**
 * main.js
 */
'use strict';

$(() => {
  // プラス・マイナスボタンのイベントリセット
  resetPlusMinusEvent();

  // 最新情報取得
  $('#update-stocks-latest').click(() => {
    location.reload();
  });

  // 上書き保存
  $('#save-stocks').click(() => {
    let res = confirm("情報を上書きしても良いですか。");
    if (res === true) {
      updateStocks(getFamilyIdFromURL());
    }
  });

  $('.add-item').click(() => {
    let name = $($('.modal-body .item-name')[0]).val();
    console.log(name);
    addedNewItem(name);
  });
});

/**
 * アイテムの個数を更新する。
 */
function updateNumOfItem(elem, num) {
  let targetElem = null;
  targetElem = $(elem).parent().find('.item-count-val');
  if (!targetElem[0]) {
    targetElem = $(elem).parent().parent().find('.item-count-val');
  }

  let val = parseInt(targetElem.text()) + num;
  targetElem.text(val);
}

function addedNewItem(name) {
  if (isExistsItem(name)) {
    alert(`『${name}』は既に存在しています。`);
    return;
  }

  // アイテム名入力し、追加
  let item_name = name;
  let item_num = 0;
  let item_elem = `<li data-id="${item_name}" class="list-group-item"><span class="list-label">${item_name}</span><button type="button" aria-label="Left Align" class="btn btn-sm btn-danger btn-plus-counter float-right"><span title="icon name" aria-hidden="true" class="oi oi-plus"></span></button><button type="button" aria-label="Left Align" class="btn btn-sm btn-primary btn-minus-counter float-right"><span title="icon name" aria-hidden="true" class="oi oi-minus"></span></button><span class="item-count-val float-right">${item_num}</span><span class="item-count-label float-right">個数:</span></li>`;
  $('.list-group').append(item_elem);
  resetPlusMinusEvent();
}

function isExistsItem(name) {
  let flag = false;
  $('.list-group-item').each((idx, elem) => {
    if (name === $(elem).data('id')) {
      flag = true;
      return false;
    }
  });

  return flag;
}

function resetPlusMinusEvent() {
  // プラスボタン
  $('.btn-plus-counter').unbind('click');
  $('.btn-plus-counter').click((event) => {
    console.log('plus!', event.target);
    updateNumOfItem(event.target, 1);
  });

  // マイナスボタン
  $('.btn-minus-counter').unbind('click');
  $('.btn-minus-counter').click((event) => {
    console.log('minus', event.target);
    updateNumOfItem(event.target, -1);
  });
}

/**
 * アイテム全体の情報を更新する。
 */
function updateStocks(family_id) {
  // アイテム情報を取得する。
  let stocks = [];
  $('.list-group-item').each((idx, elem) => {
    let data = {
      'item_name': $(elem).data('id'),
      'item_num': parseInt($($(elem).find('.item-count-val')[0]).text())
    };
    stocks.push(data);
  });

  $.ajax({
	type: "PUT",
	url: "/stock/" + family_id,
    data: JSON.stringify(stocks),
    contentType: "application/json",
	timeout: 10000,
	cache: false
  }).done(function (response, textStatus, jqXHR) {
    alert("更新しました");
  }).fail(function (jqXHR, textStatus, errorThrown) {
	alert("失敗: サーバー内でエラーがあったか、サーバーから応答がありませんでした。");

  }).always(function (data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
	// done,failを問わず、常に実行される処理
  });
}

function getFamilyIdFromURL() {
  let url = location.href;
  let splits = url.split('/');
  return splits[splits.length - 1];
}
