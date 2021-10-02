import React, {Component} from "react";
import axios from "axios";
import { createStore } from "redux";

import reducer from '../reducer'

import './Table.scss'

const initialState = {
  data: []
}

const store = createStore(reducer, initialState)
console.log('===>store.getState', store.getState())

type dataObj = {
  data: [],
}

type props = {}

class Table extends Component<props, dataObj> {
  constructor(props: props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  getData() {
    axios.get('https://api.punkapi.com/v2/beers')
      .then((res) => {
        this.setState({
          data: res.data
        })
        initialState.data = res.data
      })
      .catch((error) => {
        console.log('===>error', error);
      })
  }

  componentDidMount(): void {
    this.getData()
  }

  render() {
    if (this.state !== null) {
      console.log('===>this.state.data', this.state.data);
    }
    return (
      <div className='table'>
        <div className='row main'>
          <div className='col'>
            name
          </div>
          <div className='col'>
            tagline
          </div>
          <div className='col'>
            first_brewed
          </div>
          <div className='col'>
            description
          </div>
          <div className='col'>
            image_url
          </div>
          <div className='col'>
            abv
          </div>
          <div className='col'>
            ibu
          </div>
          <div className='col'>
            ebc
          </div>
          <div className='col'>
            srm
          </div>
          <div className='col'>
            attenuation_level
          </div>
          <div className='col'>
            volume
          </div>
          <div className='col'>
            brewers_tips
          </div>
          <div className='col'>
            contributed_by
          </div>
        </div>
        {/*cicle*/}
        {
          this.state.data.map((item: any) => (
            <div className='row' key={item.id}>
              <div className='col'>
                {item.name}
              </div>
              <div className='col'>
                {item.tagline}
              </div>
              <div className='col'>
                {item.first_brewed}
              </div>
              <div className='col'>
                {item.description}
              </div>
              <div className='col'>
                <img src={item.image_url} alt='pic'/>
              </div>
              <div className='col'>
                {item.abv}
              </div>
              <div className='col'>
                {item.ibu}  
              </div>
              <div className='col'>
                {item.ebc}
              </div>
              <div className='col'>
                {item.srm}
              </div>
              <div className='col'>
                {item.attenuation_level}
              </div>
              <div className='col'>
                {item.volume.value}
              </div>
              <div className='col'>
                {item.brewers_tips}
              </div>
              <div className='col'>
                {item.contributed_by}
              </div>
            </div>
          ))
        }
        {/*cicle*/}
      </div>
    );
  }
}

export default Table