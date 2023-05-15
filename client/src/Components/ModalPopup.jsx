import React from 'react'
import './css/modal.css'

function ModalPopup() {
    return (
        <div className='popUp'>
            <div className='QuesImgContainer'>
                <img className='QuesImg' src="/Images/QMark.jpg" />
            </div>
            <div className='content'>
                <h3>
                    Do you want to Continue?
                </h3>
                <div>
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ModalPopup