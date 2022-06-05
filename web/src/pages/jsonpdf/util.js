function iterateJSON(){
    if (item.fieldType == 'Btn') { //PDF Spec p.675
        if (item.flags & 32768) {
            setupRadioButton(annotation, item);
        }
        else if (item.flags & 65536) {
            setupPushButton(annotation, item);
        }
        else {
            setupCheckBox(annotation, item);
        }
    }
    else if (item.fieldType == 'Ch') {
        setupDropDown(annotation, item);
    }
}

function setupRadioButton(annotation, item) {
    //PDF Spec p.606: get appearance dictionary
    var ap = annotation.get('AP');
    //PDF Spec p.614 get normal appearance
    var nVal = ap.get('N');
    //PDF Spec p.689
    var i = 0;
    nVal.forEach(function(key, value){
        i++;
        if (i == 2) {
            item.value = key; //value if selected for the radio button
        }
    });
}


function setupCheckBox(annotation, item) {
    //PDF Spec p.606: get appearance dictionary
    var ap = annotation.get('AP');
    //PDF Spec p.614 get normal appearance
    var nVal = ap.get('N');
    //PDF Spec p.689
    var i = 0;
    nVal.forEach(function(key, value){
        i++;
        if (i == 1) //value when selected
            item.value = key;
    });
}

function setupDropDown(annotation, item) {
    //PDF Spec p.688
    item.value = annotation.get('Opt') || [];
}


var getFieldPosition = function(field) {
    var viewPort = this.get("viewport");
    var fieldRect = viewPort.convertToViewportRectangle(field.rect);
    var rect = Util.normalizeRect(fieldRect);
    return {
        x: Math.floor(rect[0]),
        y: Math.floor(rect[1]),
        width: Math.floor(rect[2] - rect[0]),
        height: Math.floor(rect[3] - rect[1])
    };
};

var _getFieldBaseData = function(field) {
    return _.extend({
        id: field.fullName,
        tabindex: _tabIndex++
    }, getFieldPosition.call(this, field));
};