import React, {Component} from "react"

class Meme extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg  : "http://i.imgflip.com/1bij.jpg",
            AllMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChange = this.handleMeme.bind(this)

        // with new react, method can be arrow functions and no need for binding, since the local ".this" is now global(global i mean inside the class)
    }

    componentDidMount() {
        fetch(this.state.img_url)
        .then(response => response.json)
        .then(response => {
            // response.data eh um objeto e memes eh um atributo dele
            // estamos fazendo uma desestruturação
            const {memes} = response.data
            this.setState({
                randomImg: AllMemeImgs
            })
        })
    
    }


    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    handleMeme(event) {
        // if we dont do this it will refresh the page
        event.preventDefault()
        index = Math.floor((Math.random()*this.state.AllMemeImgs.length))
        this.setState({
            "randomImg" : this.state.AllMemeImgs[index].url
        })
    }


    render() {
        return (
            <div>
                <form className="memeform">
                    <input
                        value={this.state.topText}
                        name="topText"
                        placeholder="Put Top Text"
                        onChange={this.handleChange}
                    />


                    <input
                    value={this.state.bottomText}
                    name="bottomText"
                    placeholder="Put bottom text"
                    onChange={this.handleChange}
                    />

                <button onClick={this.handleMeme}>Gen</button>
                </form>

                <div className="meme">
                    <img src= {this.state.randomImg} alt=""/>
                    <h2 className="top">{this.state.topText} </h2>
                    <h2 className="bottom">{this.state.bottomText} </h2>

                </div>
            </div>
        )
    }
}

export default Meme;