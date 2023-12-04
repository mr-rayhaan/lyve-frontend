import React from "react";
import { useLocation } from "react-router-dom";

interface Customization {
    name: Language
    variants: Array<Variant>
}
interface Variant {
    name: Language
    price: number
}
interface Language {
    en: string
    ar: string
}

export default function ItemDetails() {
    const { state } = useLocation();

    if (!state) {
        return <p>Loading</p>;
    }

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
                        <td><img src={state.image} alt="Item" /></td>
                    </tr>
                    {state.customization?.map((customization: Customization, index: number) => (
                        <React.Fragment key={`customization_${index}`}>
                            <tr><td><h1>Customization {` ` + (index + 1)}</h1></td></tr>
                            <tr>
                                <td><label>Customization Name English</label></td>
                                <td><label>{customization.name.en}</label></td>
                            </tr>
                            <tr>
                                <td><label>Customization Name Arabic</label></td>
                                <td><label>{customization.name.ar}</label></td>
                            </tr>

                            {customization.variants.map((variant, variantIndex) => (
                                <React.Fragment key={`variant_${index}_${variantIndex}`}>
                                    <tr><td><h2>Variant {` ` + (variantIndex + 1)}</h2></td></tr>
                                    <tr>
                                        <td><label>Variant Name English</label></td>
                                        <td><label>{variant.name.en}</label></td>
                                    </tr>
                                    <tr>
                                        <td><label>Variant Name Arabic</label></td>
                                        <td><label>{variant.name.ar}</label></td>
                                    </tr>
                                    <tr>
                                        <td><label>Variant Price</label></td>
                                        <td><label>{variant.price}</label></td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
}
