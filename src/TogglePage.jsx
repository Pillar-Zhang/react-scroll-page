// cSpell:word Scrollchor
import React, {Component} from "react"
import Scrollchor from "react-scrollchor";
import "./TogglePage.css"
const scrollDotArray = ["one", "two", "three", "four", "five", "six"]

export default class TogglePage extends Component {
    constructor() {
        super()
        this.state = {
            activeDot: 0
        }
        scrollDotArray.forEach(dot => {
            this[dot] = null
        })
    }

  onChangeDotActive=(index) => {
      this.setState({
          activeDot: index
      })
  }
  componentDidMount() {
      let isScroll = false
      window.onscroll = () => { 
          var t = document.documentElement.scrollTop || document.body.scrollTop;
          let {activeDot} = this.state
          if (!isScroll && t >= 100 + activeDot * window.innerHeight && activeDot < 5 ) { 
              isScroll = true
              const target = scrollDotArray[activeDot + 1]
              this.setState({activeDot: activeDot + 1}, () => {
                  if (!this[target] || !this[target].simulateClick) return
                  this[target].simulateClick()
                  setTimeout(() => {isScroll = false}, 1000)
              })
             
          } else if (!isScroll && t <= -100 + activeDot * window.innerHeight && activeDot > 0) { 
              isScroll = true
              const target = scrollDotArray[activeDot - 1]
              this.setState({activeDot: activeDot - 1}, () => {
                  if (!this[target] || !this[target].simulateClick) return
                  this[target].simulateClick()
                  setTimeout(() => {isScroll = false}, 1000)
              })
          }
      }   

  }
  render () {
      const {activeDot} = this.state
      return <ul className="toggle-page">
          {
              scrollDotArray.map((pageDot, index) => {
                  if (index + 1 < scrollDotArray.length) {
                      return (
                          <li key={index}>
                              <Scrollchor disableHistory={false} ref={node => this[pageDot] = node} to={"#" + pageDot}>
                                  {activeDot === index && 
                    <i onClick={() => this.onChangeDotActive(index)} className="dot-scroll-page dot-active" />}
                                  {activeDot !== index && 
                    <i onClick={() => this.onChangeDotActive(index)} className="dot-scroll-page dot-default" />}
                                  <i onClick={() => this.onChangeDotActive(index)} className="dot-scroll-page dot-bar" />
                              </Scrollchor>
                          </li>   
                      )
                  }
                  return <li key={index}>
                      <Scrollchor disableHistory={false} ref={node => this[pageDot] = node} to={"#" + pageDot}>
                          {activeDot === index && 
                        <i onClick={() => this.onChangeDotActive(index)} className="dot-scroll-page dot-active" />}
                          {activeDot !== index && 
                        <i onClick={() => this.onChangeDotActive(index)} className="dot-scroll-page dot-default" />}
                      </Scrollchor>
                  </li> 
              })
          }
      </ul>
  }
}
