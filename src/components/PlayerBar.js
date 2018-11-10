import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">
            <section id="buttons">
                <button className='mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect mdl-button--colored mdl-button--raised' id="previous" onClick ={this.props.handlePrevClick}>
                    <span className="icon ion-md-skip-backward mdl-button--accent"></span>
                </button>
                <button className='mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect mdl-button--colored mdl-button--raised' id="play-pause" onClick={this.props.handleSongClick}>
                    <span className={this.props.isPlaying ? 'icon ion-md-pause mdl-button--accent' : 'icon ion-md-play mdl-button--accent'}></span>
                </button>
                <button className='mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect mdl-button--colored mdl-button--raised' id="next" onClick ={this.props.handleNextClick}>
                    <span className="icon ion-md-skip-forward mdl-button--accent"></span>
                </button>
            </section>
            <section id="time-control">
                <div className="current-time">{this.props.currentTime}</div>
                <input 
                    type="range" 
                    className=" mdl-slider mdl-js-slider" 
                    value={(this.props.currentTime / this.props.duration) || 0} 
                    max='1'
                    min='0'
                    step= '0.01'
                    onChange={this.props.handleTimeChange}
                    />
                <div className="total-time">{this.props.formatTime()}</div>
            </section>
            <section id="volume-control">
                <div className="icon ion-md-volume-low "></div>
                <input type="range" className=" mdl-slider mdl-js-slider" value="80" />
                <div className="icon ion-md-volume-high"></div>
            </section>
       </section>
     );
   }
 }

 export default PlayerBar;