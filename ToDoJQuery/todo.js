$(document).ready(function(e) {
    $('#add-todo').button({
        icons : {
            primary: "ui-icon-circle-plus"  // добавляет к кнопке значок "+"
        }
    }).click(function(){ // это связал функцию клик с окончанием функции button
        $('#new-todo').dialog('open'); // щелчок по кнопке откроет диалоговое окно

    });

    $('#new-todo').dialog({
        
        modal : true,   // требует чтобы юзер закрыл диалоговое окно чтобы получить возможность дальше что-то делать на странице
        autoOpen : false, // диалоговое окно не будет открываться само при запуске бразуера
        buttons : {   // добавляет кнопки в окно
            "Добавить" : function () {
                var taskName = $('#task').val();
                if (taskName === '') {   // проверка на пустую вводимую строку
                    return false;
                    

                }

                var taskHTML = '<li><span class="done">%</span>'; // добавление новой переменной и значения строк
                taskHTML += '<span class="delete">x</span>'; // += позволяет объеденить строку со строкой уже содержащейся уже в существующей переменной
                taskHTML += '<span class="task"></span></li>';

                var $newTask = $(taskHTML);

                $newTask.find('.task').text(taskName); // .find берет элемент ли внутри элемента newTask и ищет внутри него другой элемент с именем класса таск - это элемент спан куда и помещается задача
                
                // .text затем добавляет содержимое переменной taskName в этот элемент span
                $newTask.hide();

                
                $('#todo-list').prepend($newTask);  //.prepend - добавление в hrml код
                
                $newTask.show('clip',250).effect('highlight',1000); // clip _ визуальное увеличение обьекта  effect - привлекае к нему внимание путем вспышки
                $(this).dialog('close');

            },
            "Отмена" : function () {
                $(this).dialog('close');
            }
        },
        close : function(){
            $('#new-todo input').val('');
        }
    });

    // галочка и перенос в список выполненнных задач

    $('#todo-list').on('click', '.done', function(){ // основная схема делегирования событий 1 - клик , 2 - элемент внутри неупорядоченного списка (спан)
        var $taskItem = $(this).parent('li'); // this относится к '<li><span class="done">%</span>' и выбирает ближайшего предка, который является элементом li. Крч выбирает нужный нам элемент списка
        $taskItem.slideUp(250, function(){
            var $this = $(this); // выбирает элемент из списка $(this) и сохраняет его в другой переменной сделано для упрощения, потому что дохера будет юзаться
            $this.detach(); // удаление со страницы выбранный HTML элемент но не полностью от них избавиться
            $('#completed-list').prepend($this);
            $this.slideDown();

        })

    })

    // возможность перетаскивания задач перенося их одну под другую или наоборот
     
    $('.sortlist').sortable({
        connectWith : '.sortlist',
        cursor : 'pointer',
        placeholder : 'ui-state-highlight',
        cancel : 'delete, .done'
    })

    // удаление задач

    $('.sortlist').on('click', '.delete', function(){
        $(this).parent('li').effect('fold', function(){ //.parent выбирает предка li, который хочу удалить
            $(this).remove();
        })
    })
    

}); // end ready