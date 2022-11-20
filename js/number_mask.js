window.addEventListener("DOMContentLoaded", function () {



    activateMasks();



    function activateMasks() {

        let elems = document.querySelectorAll('input.mask');

        elems.forEach(elem => {

            let mask = new Mask();

            elem.addEventListener("input", mask.create, false);

            elem.addEventListener("focus", mask.create, false);

            elem.addEventListener("click", mask.create, false);

            elem.addEventListener("keydown", mask.create, false);

        })

    }



    function Mask() {

        this.completed = false;

        this.create = (event) => {

            let element = event.target;

            let oldValue = element.value;
            let caretPosition = element.selectionStart;

            let isCaretInEndPosition = oldValue.substring(caretPosition).search(/\d/) === -1;

            let caretMinPosition = 4; // минимально допустимая позиция каретки (не заходить на '+7 (' )



            if (event.type === "keydown") {

                let key = event.key;

                if (key === "Backspace" && oldValue.substring(caretPosition - 1, caretPosition).search(/[\s)-]/) !== -1) {

                    let shift = 1; // на сколько сдвинуть каретку

                    if (oldValue.substring(caretPosition - 2, caretPosition) === ') ') shift = 2;

                    element.setSelectionRange(caretPosition - shift, caretPosition - shift);

                }

                if (key === "Delete" && oldValue.substring(caretPosition, caretPosition + 1).search(/[\s)-]/) !== -1) {

                    let shift = 1;

                    if (oldValue.substring(caretPosition, caretPosition + 2) === ') ') shift = 2;

                    element.setSelectionRange(caretPosition + shift, caretPosition + shift);

                }



                if (key === "ArrowLeft" && caretPosition === caretMinPosition) event.preventDefault();

                if (key === "ArrowRight" && isCaretInEndPosition) event.preventDefault();



                if (key === "ArrowUp") key = "Home";

                if (key === "ArrowDown") key = "End";



                if (key === "Home") {

                    element.setSelectionRange(caretMinPosition, caretMinPosition);

                    event.preventDefault()

                }



                if (key === "End") {

                    let caretMaxPosition = oldValue.indexOf("_");

                    if (caretMaxPosition !== -1) {

                        element.setSelectionRange(caretMaxPosition, caretMaxPosition);

                        event.preventDefault()

                    }

                }



                return

            }



            // вычисляем значение value элемента

            let newValue = oldValue; // при событии focus & click значение value не меняется

            if (event.type === "input") {

                let matrix = "+7 (___) ___-__-__",

                    i = 0,

                    def = matrix.replace(/\D/g, ""),

                    val = oldValue.replace(/\D/g, "")

                newValue = matrix.replace(/[_\d]/g, function (match) {

                    return i < val.length ? val.charAt(i++) || def.charAt(i) : match

                });

                element.value = newValue;

            }



            // определяем положение каретки

            let caretMaxPosition = newValue.indexOf("_");

            let isCompleted = false;// все ли цифры заполнены

            if (caretMaxPosition === -1) {

                caretMaxPosition = newValue.length;

                isCompleted = true;

            }

            if (isCaretInEndPosition) {

                caretPosition = caretMaxPosition

            } else if (caretPosition < caretMinPosition) {

                caretPosition = caretMinPosition

            } else if (caretPosition > caretMaxPosition) {

                caretPosition = caretMaxPosition

            }

            element.setSelectionRange(caretPosition, caretPosition);



            // если изменилось значение completed

            if (isCompleted !== this.completed) {

                this.completed = !this.completed;

                element.parentElement.classList.toggle('completed');

            }

        }

    }



});