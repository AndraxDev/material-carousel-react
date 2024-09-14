/**
 * Material Design 3 Carousel
 * Copyright (c) 2024 Dmytro Ostapenko. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * */

import React, {useEffect} from 'react';

function MaskableFragment(props) {

    const [image, setImage] = React.useState(props.url);
    const [width, setWidth] = React.useState(props.width);

    useEffect(() => {
        setImage(props.url);
    }, [props.url]);

    useEffect(() => {
        setWidth(props.width);
    }, [props.width]);

    return (
        <div style={{
            width: width + "px"
        }} className={"mask-bg"}>
            <div className={"mask-content-bg"} style={{
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                {/* Background image can be replaced with interactable content */}
            </div>
        </div>
    );
}

export default MaskableFragment;
