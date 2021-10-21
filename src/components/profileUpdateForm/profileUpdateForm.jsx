import { useRef } from "react";

export const ProfileUpdateForm = ({ updateProfile, about }) => {
    const aboutRef = useRef();

    const onSubmit = (event) => {
        event.preventDefault();
        updateProfile({
            about: aboutRef.current.value
        })
    }

    return (
        <>
            <form onSubmit={ onSubmit }>
                profileUpdate <br/>
                about: <input ref={aboutRef} type="text" name="about" defaultValue={ about }/>
                <button type="submit">Update</button>
            </form>
        </>
    )
}