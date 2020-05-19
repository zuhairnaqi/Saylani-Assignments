import React from 'react'
import AudioAnalyser from './Analyser';
import Music from '../../Musics/_ad.mp3'

export default class VisualizerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: Music
    };
  }
  render() {
    return (<div>
      <audio src={Music} style={{ display: 'none' }} autoPlay={true} />
      {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
    </div>)
  }
}