import React from "react"
import "./showkeeper.css"
import axios from "axios"

const ShowKeeper = ({ keeperList, setKeeperList }) => {

    const deleteKeeper = (id) => {                                           //This for deleting the keeper note...
        axios.post("http://localhost:3001/api/delete", { id })
            .then(res => setKeeperList(res.data))                           //After deleting again updating the KeeperList 
    }

    /*I used the font awsome icon which is on the top right 
    corner of notes included the tag in public/index.html*/

    return (
        <div className="showKeeper row">
            {                                               //storing in map and iterating one by one on it
                keeperList.map(keeper => (                 //used col-md-3 bootstrap for positioning of the keeper card
                    <div className="keeperCard col-md-3" key={keeper._id}>
                        <h1 className="title">
                            {keeper.title}
                            <i className="deleteIcon fa fa-trash" aria-hidden="true" onClick={() => deleteKeeper(keeper._id)} ></i>
                        </h1>
                        <textarea
                            className="descriptionBox"
                            value={keeper.description}
                            readOnly />
                    </div>
                ))
            }
        </div>
    )
}

export default ShowKeeper