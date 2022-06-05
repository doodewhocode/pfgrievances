import React from 'react'

function JSONPdf() {




    var _handleUserData = function (formIdx) {
        var self = this;
        var formData = self.pdfParser.getFormUserData(formIdx);
        var $form = self.forms[formIdx];

        $form.find('input').bind('change', function (evt) {
            if (this.type == 'checkbox')
                formData[this.name] = this.checked;
            else {//if (!this.type || this.type == 'text' || this.type == 'radio')
                formData[this.name] = this.value;
            }
        });

        $form.find('select').bind('change', function (evt) {
            formData[this.name] = this.value;
        });

        _fillUserData.call(self, $form, formData);
    };


    //save user data to DOM storage
    var updateUserData = function () {
        var uD = this.get('userData');
        $('body').data(this.get('formInstanceID'), uD);
    }
    //to make sure each pdf page has a userData object associated
    const initUserData = (pageCount) => {
        var uD = [];
        for (var i = 0; i < pageCount; i++) {
            uD.push({});
        }
        this.set({ userData: uD }, { silent: true });
    }

    var _fillUserData = function ($form, formData) {
        var self = this;
        $form.find('input').each(function (index, inputEle) {
            if (_.has(formData, this.name)) {
                if (this.type == 'checkbox') {
                    this.checked = formData[this.name];
                }
                else if (this.type == 'radio') {
                    this.checked = this.value === formData[this.name];
                }
                else
                    this.value = formData[this.name];
            }
        });

        $form.find('select').each(function (i, s) {
            if (_.has(formData, this.name)) {
                this.value = formData[this.name];
            }
        });
    };
    return (
        <section>
            <div className='pdfpage' style="width:918px; height:1188px;" useRef>
                <canvas width="918px" height="1188px">
                    <form>

                    </form>
                </canvas>
            </div>
        </section>
    )
}