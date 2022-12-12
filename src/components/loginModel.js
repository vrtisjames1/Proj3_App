import React, {useState, useEffect} from 'react'

const LoginModal = () => {

    const Modal = (props) => {
        if (!props.modalshow){
            return null
        }
    }

    return (

        <div className='modal' onClick={props.onClose}>
            <div className='modal-content' onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className='modal-header'>
                    <h4 className='modal-title'>Modal Title</h4>
                </div>

                <div className='modal-body'>
                    CONTENT
                </div>

                <div className='modal-footer'>
                    <button className='modal-button' onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default LoginModal