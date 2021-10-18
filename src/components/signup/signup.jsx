export const SignUp = () => {

    const onSubmit = () => {

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                userId: <input type="text" name="userId"/>
                name: <input type="text" name="name"/>
                password: <input type="password" name="password"/>
                about: <input type="text" name="about"/>
                email: <input type="text" name="email"/>
                photoURL: <input type="file" name="photoURL"/>
            </form>
        </>
    )
}