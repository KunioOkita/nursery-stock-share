/**
 * main.js
 */
'use strict';

$(() => {
  // プラスボタン
  $('.btn-plus-counter').click((event) => {
    console.log('plus!', event.target);
    updateNumOfItem(event.target, 1);
  });

  // マイナスボタン
  $('.btn-minus-counter').click((event) => {
    console.log('minus', event.target);
    updateNumOfItem(event.target, -1);
  });

  // 更新
  $('update-data').click(() => {
    // itemの一覧を取得し、更新用JSONを作成し、Ajaxで送信する。
  });
});

function updateNumOfItem(elem, num) {
  let targetElem = null;
  targetElem = $(elem).parent().find('.item-count-val');
  if (!targetElem[0]) {
    targetElem = $(elem).parent().parent().find('.item-count-val');
  }

  let val = parseInt(targetElem.text()) + num;
  targetElem.text(val);
}
