import { useLocation } from "react-router-dom";

export default function ItemDetails() {
    const { state } = useLocation();

    if (!state) {
        return <p>Loading</p>;
    }
    console.log(state)
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td><label>Name English</label></td>
                        <td><label>{state.name.en}</label></td>
                    </tr>
                    <tr>
                        <td><label>Name Arabic</label></td>
                        <td><label>{state.name.ar}</label></td>
                    </tr>
                    <tr>
                        <td><label>Description English</label></td>
                        <td><label>{state.description.en}</label></td>
                    </tr>
                    <tr>
                        <td><label>Description Arabic</label></td>
                        <td><label>{state.description.ar}</label></td>
                    </tr>
                    <tr>
                        <td><label>Price</label></td>
                        <td><label>{state.price}</label></td>
                    </tr>
                    <tr>
                        <td><label>Image</label></td>
                        <td><img src={state.image} /></td>
                    </tr>
                    <tr>
                        <td><label>Customization Name English</label></td>
                        <td><label></label></td>
                    </tr>
                    <tr>
                        <td><label></label></td>
                        <td><label></label></td>
                    </tr>
                    <tr>
                        <td><label></label></td>
                        <td><label></label></td>
                    </tr>
                    <tr>
                        <td><label></label></td>
                        <td><label></label></td>
                    </tr>
                    <tr>
                        <td><label></label></td>
                        <td><label></label></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}