import React, {Component} from "react";
import axios from "axios";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
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
        <div className='row'>
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
            method
          </div>
          <div className='col'>
            fermentation
          </div>
          <div className='col'>
            ingredients
          </div>
          <div className='col'>
            amount
          </div>
          <div className='col'>
            hops
          </div>
          <div className='col'>
            yeast
          </div>
          <div className='col'>
            food_pairing
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
          this.state.data.map(item => (
            <div className='row'>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

              </div>
              <div className='col'>

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