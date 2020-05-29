import React from 'react';

const layout = (props) => {
    return (
        <React.Fragment>
            <div>Components: Toolbar, Sidedrawer, Backdrop</div>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default layout;