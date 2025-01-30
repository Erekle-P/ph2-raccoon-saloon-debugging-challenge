import { useState } from 'react'

function RaccoonForm({ setRaccoonsArr, raccoonsArr }) {

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [img_url, setImgUrl] = useState("")


    function handleChangeName(event) {
        setName(event.target.value)
    }
    
    function handleChangeLocation(event) {
        setLocation(event.target.value)
    }

    function handleChangeImageUrl(event) {
        setImgUrl(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const bodyObj = {name, location, img_url}

        fetch("http://localhost:5555/raccoons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify ({name, location, img_url})
        })
        .then( res => {
            if (res.ok) {
                setName("")
                setLocation("")
                setImgUrl("")
                return res.json()
            } else {
                throw new Error("Something went wrong!")
            }
        })
        .then( data => setRaccoonsArr([...raccoonsArr, data]) )
        .catch(err => alert(err))
    }

    return (
        <form className="new-raccoon-form" onSubmit={handleSubmit}>

            <label htmlFor="name">Name:</label>
            <input type="text" 
            name="name" 
            onChange={handleChangeName} 
            value={name}
            placeholder="raccoon name" />

            <label htmlFor="location">Location:</label>
            <input type="text" 
            name="location" 
            onChange={handleChangeLocation} 
            value={location}
            placeholder="raccoon location" />

            <label htmlFor="img_url">Image:</label>
            <input type="text" 
            name="img_url" 
            onChange={handleChangeImageUrl} 
            value={img_url}
            placeholder="image url" />

            <br/>

            <input type="submit" value="Add Raccoon" />

        </form>
    )

}

export default RaccoonForm