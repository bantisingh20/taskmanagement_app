import React, { useState } from 'react';
import Select from 'react-select';
//https://react-select.com/components#components
export const CommonSelectTag = ({colourOptions,isClearable,isDisabled,isLoading,isRtl,isSearchable,bindlabel,bindvalue,isMulti,closeMenuOnSelect}) => {
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={colourOptions[0]}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isMulti={isMulti}
                isSearchable={isSearchable}
                name={bindlabel}
                value={bindvalue}
                options={colourOptions}
                closeMenuOnSelect={closeMenuOnSelect} // this will close the select tag after select
            />
        </>
    )
}