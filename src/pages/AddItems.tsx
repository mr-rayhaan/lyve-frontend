import { ChangeEvent, useState } from "react";
import { menuItems } from "../config/apis/MenuItems";
import { generateMultipartAPI } from "../config/ApiGenerate";

import React from "react";

export default function AddItems() {
    const [formData, setFormData] = useState({
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        price: "",
        customizations: [
            {
                name: { en: "", ar: "" },
                variants: [{ name: { en: "", ar: "" }, price: "" }],
            },
        ],
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAddCustomization = () => {
        const newCustomization = {
            name: { en: "", ar: "" },
            variants: [{ name: { en: "", ar: "" }, price: "" }],
        };

        setFormData((prevState) => ({
            ...prevState,
            customizations: [...prevState.customizations, newCustomization],
        }));
    };

    const handleCustomizationInputChange = (customizationIndex: number, field: string, value: string) => {
        setFormData((prevData) => {
            const updatedCustomizations = [...prevData.customizations];
            (updatedCustomizations[customizationIndex] as any)['name'][field] = value;
            console.log('updatedCustomization', updatedCustomizations)
            return {
                ...prevData,
                customizations: updatedCustomizations,
            };
        });
    };

    const handleVariantInputChange = (customizationIndex: number, variantIndex: number, field: string, value: string) => {
        setFormData((prevData) => {
            const updatedCustomizations = [...prevData.customizations];
            (updatedCustomizations[customizationIndex].variants[variantIndex] as any)['name'][field] = value;
            return {
                ...prevData,
                customizations: updatedCustomizations,
            };
        });
    };
    const handleVariantPriceChange = (customizationIndex: number, variantIndex: number, value: string) => {
        setFormData((prevData) => {
            const updatedCustomizations = [...prevData.customizations];
            (updatedCustomizations[customizationIndex].variants[variantIndex] as any)['price'] = value;
            return {
                ...prevData,
                customizations: updatedCustomizations,
            };
        });
    };
    const handleRemoveCustomization = (index: number) => {
        const updatedCustomizations = [...formData.customizations];
        updatedCustomizations.splice(index, 1);

        setFormData((prevState) => ({
            ...prevState,
            customizations: updatedCustomizations,
        }));
    };

    const handleAddItem = async () => {
        // Perform validation
        if (
            !formData.name_en ||
            !formData.name_ar ||
            !formData.description_en ||
            !formData.description_ar ||
            !formData.price ||
            formData.customizations.some((customization) => !customization.name.en || !customization.name.ar)
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validation for variant prices or any other specific validation can be added here

        // If all validation passes, proceed with the API call
        const addItemApi = menuItems.addMenuItem;
        const formDataToSend = new FormData();

        // Append form data to FormData object
        formDataToSend.append("name_en", formData.name_en);
        formDataToSend.append("name_ar", formData.name_ar);
        formDataToSend.append("description_en", formData.description_en);
        formDataToSend.append("description_ar", formData.description_ar);
        formDataToSend.append("price", formData.price);

        // Append image file if selected
        if (selectedFile) {
            formDataToSend.append("image", selectedFile);
        }

        // Append customizations to FormData object
        formData.customizations.forEach((customization, index) => {
            formDataToSend.append(`customization_name_en_${index}`, customization.name.en);
            formDataToSend.append(`customization_name_ar_${index}`, customization.name.ar);

            customization.variants.forEach((variant, variantIndex) => {
                formDataToSend.append(`variant_name_en_${index}_${variantIndex}`, variant.name.en);
                formDataToSend.append(`variant_name_ar_${index}_${variantIndex}`, variant.name.ar);
                formDataToSend.append(`variant_price_${index}_${variantIndex}`, variant.price);
            });
        });

        try {
            addItemApi.data = formDataToSend
            const response = await generateMultipartAPI(addItemApi);
            alert(response?.data.message);
        } catch (ex) {
            console.error(ex);
            alert("An error occurred while adding the item.");
        }
    };

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>Name English</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="name_en"
                            value={formData.name_en}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Name Arabic</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="name_ar"
                            value={formData.name_ar}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Description English</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Description Arabic</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="description_ar"
                            value={formData.description_ar}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Price</label>
                    </td>
                    <td>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Image</label>
                    </td>
                    <td>
                        <input type="file" name="image" onChange={handleImageChange} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={handleAddCustomization} className="btn-purple">
                            Add Customization
                        </button>
                    </td>
                </tr>
                {/* Render customization input fields */}
                {formData.customizations.map((customization, index) => (
                    <React.Fragment key={`customizations_` + index}>
                        <tr key={`customization_` + index}>
                            <td>
                                <h1>Customization{` ` + (index + 1)}</h1>
                            </td>
                        </tr>
                        <tr key={`customization_name_en_` + index}>
                            <td>
                                <label>Customization Name English</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={customization.name.en}
                                    onChange={(e) => { handleCustomizationInputChange(index, 'en', e.target.value) }}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-red"
                                    onClick={() => handleRemoveCustomization(index)}
                                >
                                    Remove Customization{` ` + (index + 1)}
                                </button>
                            </td>
                        </tr>
                        <tr key={`customization_name_ar_` + index}>
                            <td>
                                <label>Customization Name Arabic</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={customization.name.ar}
                                    onChange={(e) => { handleCustomizationInputChange(index, 'ar', e.target.value) }}
                                />
                            </td>
                        </tr>
                        {customization.variants.map((variant, variantIndex) => (
                            <React.Fragment key={`variants_` + index}>
                                <tr key={`variant_name_en_` + variantIndex}>
                                    <td>
                                        <label>Variant Name English</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={variant.name.en}
                                            onChange={(e) => { handleVariantInputChange(index, variantIndex, 'en', e.target.value) }}
                                        />
                                    </td>
                                </tr>
                                <tr key={`variant_name_ar_` + variantIndex}>
                                    <td>
                                        <label>Variant Name Arabic</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={variant.name.ar}
                                            onChange={(e) => { handleVariantInputChange(index, variantIndex, 'ar', e.target.value) }}
                                        />
                                    </td>
                                </tr>
                                <tr key={`variant_price_` + variantIndex}>
                                    <td>
                                        <label>Variant Price</label>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name={`variant_price_` + { index }}
                                            onChange={(e) => { handleVariantPriceChange(index, variantIndex, e.target.value) }}
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
                <tr>
                    <td></td>
                    <td>
                        <button className="btn btn-blue" onClick={handleAddItem}>
                            Submit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
