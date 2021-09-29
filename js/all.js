// 建立可讓使用者自行新增和移除的項目清單
// 以localStorage儲存資料

$(document).ready(function() {
            var data = JSON.parse(localStorage.getItem('datalist')) || [];
            var $list = $('ul'); //表單
            var $newItemForm = $('#newItemForm'); //新增項目的表單
            var $newItemButton = $('#newItemButton'); //新增項目的按鈕
            var item = ''; //新清單的初始值
            var $itemDescription = $('#itemDescription'); //輸入值
            uptotalList(data);


            // 表單進入畫面的動畫
            $('li')
                .hide()
                .each(function(index) {
                    $(this)
                        .delay(450 * index)
                        .fadeIn(1600);
                });

            // 初始化設定新增清單項目表單
            $newItemButton.show();
            $newItemForm.hide();
            $newItemButton.on('click', function() {
                $newItemButton.hide();
                $newItemForm.show();
            });

            // 資料新增後，將資料存入localStorage
            $newItemForm.on('submit', function(e) {
                    e.preventDefault(); //取消預設行為
                    addData();
                    updataList(data);
                    localStorage.setItem('datalist', JSON.stringify(data));
                    updataCount();
                });

                // 事件委派
                $list.on('click', 'li', function(e) {
                    let $this = $(this);
                    let tag = e.target;
                    let complete = $this.hasClass('complete');

                    // 檢查li 是否帶有.complete 回傳布林值
                    if (complete === true) {
                        $this.animate({
                                opacity: 0.0,
                                padding: '+=180'
                            },
                            500,
                            'swing',
                            function() {
                                clearList(tag);
                                $this.remove();
                            }
                        );
                    } else {
                        item = $this.text();
                        $this.remove();
                        $list
                            .append(
                                `<li data-num="${tag.dataset.num}" class="complete">${item}</li>`
                            )
                            .hide()
                            .fadeIn(300);
                        updataCount();
                    }
                });

                // 更新未完成項目的數量
                function updataCount() {
                    let items = $('li[class!=complete]').length;
                    // 不具備 .complete 的 li數量
                    $('.number').text(items);
                }
                updataCount();


                // 新增資料
                function addData() {
                    let text = $itemDescription.val();
                    data.push(text);
                }


                // 修改資料後 重新渲染畫面
                function updataList(item) {
                    let str = '';
                    let len = item.length;
                    for (let i = 0; i < len; i++) {
                        str = `<li data-num="${i}">${data[i]}</li>`;
                    }
                    $list.append(str);
                }

                // 初始化 重新渲染畫面
                function uptotalList(item) {
                    let str = '';
                    let len = item.length;
                    for (let i = 0; i < len; i++) {
                        str += `<li data-num="${i}">${data[i]}</li>`;
                    }
                    $list.append(str);
                }


                // 刪除資料後，將資料存入localStorage
                function clearList(d) {
                    let index = d.dataset.num;
                    data.splice(index, 1);
                    localStorage.setItem('datalist', JSON.stringify(data));
                }















            });