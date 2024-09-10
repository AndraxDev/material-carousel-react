import React from 'react';

function MaskableFragment(props) {
    return (
        <div style={{
            width: props.width + "px"
        }} className={"mask-bg"}>
            <div className={"mask-content-bg"} style={{
                backgroundImage: "url(" + props.url + ")",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                {/* Background image can be replaced with interactable content */}
            </div>
        </div>
    );
}

export default MaskableFragment;
