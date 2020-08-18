import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { GlobalStateContext } from '../context/GlobalContextProvider'

const ItemList = ({ items }) => {
  const state = useContext(GlobalStateContext)

  return (
    <ul className="contents">
    {
      items.map((item, index) => {
        const itemNameSplit = item.name.split(/\s/g)
        return (
          <li className="item" key={item.id} style={{height: `${state.itemHeight}px`}}>
            <Link to={`/${itemNameSplit[0].toLowerCase()}/${itemNameSplit[1]}`}>
              <h2>{item.name}</h2>
              <h3>{item.id}</h3>
              <div className="img-box">
                {
                  item.images.map((image, index) => (
                    <Img key={`${item.id}-${index}`}
                      fluid={image.childImageSharp.fluid}
                      style={{width:`${state.imgSize}px`, height: `${state.imgSize}px`}}
                    />
                  ))
                }
              </div>
            </Link>
          </li>
        )
      })
    }
    </ul>
  )
}

export default ItemList