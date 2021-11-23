import React, { useState, useEffect } from 'react'


function FormControl(props) {
    return (
        <>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Query Name</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="" />
                </div>
            </div>

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Query Description</label>
                <div class="col-sm-10">
                    <textarea type="password" class="form-control" id="inputPassword" placeholder="" />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Additional Description</label>
                <div class="col-sm-10">
                    <textarea type="password" class="form-control" id="inputPassword" placeholder="" />
                </div>
            </div>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="" />
                </div>
            </div>

            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="" />
                </div>
            </div>

            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Define Documents</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="" />
                </div>
            </div>

        </>
    )
}

export default FormControl