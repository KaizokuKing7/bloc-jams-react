import React, { Component } from 'react';
import albumData from '../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props){
        super(props);
        
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
        this.state = {
            album: album ,
            currentSong: album.songs[0],
            isPlaying: false,
            isHovered: false,
            currentTime:0,
            duration:album.songs[0].duration,
            volume: 1
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }
    
    play(){
        this.audioElement.play();
        this.setState({isPlaying: true});
    }

    pause(){
        this.audioElement.pause();
        this.setState({isPlaying: false});
    }

    setSong(song){
        this.audioElement.src = song.audioSrc;
        this.setState({currentSong: song});
    }
    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong){
            this.pause();
        } else{
            if (!isSameSong) {this.setSong(song);}
            this.play();
        }
    }

    isHovering(song){
        this.setState({isHovered: song})
    }

    notHovering(){
        this.setState({isHovered: false})
    }
    
    onHover(song,index){
        if (this.state.isPlaying && song === this.state.currentSong ){
            return(<span className='icon ion-md-pause'></span>);
        }else if (this.state.isHovered === song && song !== this.state.currentSong){
            return(<span className='icon ion-md-play'></span>);   
        }else if (this.state.isHovered === song && this.state.currentSong === song  ){
            return(<span className='icon ion-md-play'></span>);   
        }return(index +1)
    }

    handlePrevClick(){
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0,currentIndex -1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    handleNextClick(){
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length -1,currentIndex +1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            }
        };
            this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
            this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    handleTimeChange(e){
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({curentTime: newTime});
    }

    formatTime(duration){
        const minutes = Math.floor(duration /60);
        const seconds = Math.floor(duration % 60);
        const convertedTime = `${minutes}:${seconds}`;
        return (convertedTime);
    }

    handleVolumeChange(e){
        const newVol =  e.target.value;
        this.audioElement.volume = newVol;
        this.setState({volume: newVol});
    }


    render() {
      return (
        <section className="album">
            <section id="album-info">
                <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
                <div className="album-details">
                    <h1 id="album-title">{this.state.album.title}</h1>
                    <h2 className="artist">{this.state.album.artist}</h2>
                    <div id="release-info">{this.state.album.releaseInfo}</div>
                </div>
            </section>
            <table id="song-list" className='mdl-data-table mdl-js-data-table'>
                <colgroup>
                    <col id="song-number-column" />
                    <col id="song-title-column" />
                    <col id="song-duration-column" />
                </colgroup>  
                <tbody>
                    {this.state.album.songs.map((song,index) =>
                        <tr className='song' key={index} 
                        onClick={() => this.handleSongClick(song)}
                        onMouseEnter={()=> this.isHovering(song)}
                        onMouseLeave={()=> this.notHovering()}>
                            
                            <td>{this.onHover(song,index)}</td> 
                            <td className="mdl-data-table__cell--non-numeric mdl-button--primary">{song.title}</td>
                            <td>{this.formatTime(song.duration)}</td>
                        </tr>
                        )}
                </tbody>
            </table>
            <PlayerBar 
            isPlaying={this.state.isPlaying} 
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            time={this.formatTime(this.audioElement.currentTime)}
            duration={this.audioElement.duration}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            formatTime={()=> this.formatTime(this.state.currentSong.duration)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            volume={this.audioElement.volume}
            />
        </section>
      );
    }
  }

  export default Album;

