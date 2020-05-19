import React, { Component } from 'react';

class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            circles: [],
            inc: 0
        }
    }
    render() {
        return <svg width={window.innerWidth-50} height="400" ref={this.canvas} style={{
            position: 'fixed',
            top: '0%',
            left: '30%',
            right: 0,
            bottom: 0,
            zIndex: '1',
            margin: '0 auto'
        }}>
            {this.circles && this.circles.length > 0 ? this.circles.map(circle => circle) : null}
        </svg>;
    }
    draw() {
        let elems = [];
        elems = []
        const { audioData } = this.props;
        const canvas = this.canvas.current;

        const height = canvas.height.animVal.value;
        
        const width = canvas.width.animVal.value;
        let x = 0;
        const sliceWidth = (width * 1.0) / audioData.length;

        for (let i = 10; i < 20; i++) {
            const y = (audioData[i] / 255.0) * height;
            x += sliceWidth;
            elems.push(<circle key={i} className={audioData[0] === 0 || audioData[0] === 128 ? "animation" : ''} r={audioData[i] <= 130 ? (x + y) - 250 : ((parseInt(x) + parseInt(y)) - 150)} fill={audioData[i] % 2 === 0 ? '#fcfcfd94' : '#fcfcfd94'} cx={260} cy={220} />)
        }
        this.circles = elems
    }
    componentDidUpdate() {
        this.draw();
    }
}

export default AudioVisualiser;