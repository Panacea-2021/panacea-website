"use strict";

const React = require("react");
require("ts-node").register({
    compilerOptions: {
        module: "commonjs",
        target: "es2015",
        jsx: "react-jsx"
    }
});

const { productsContent } = require("./src/data/companyContent.ts");

const content = productsContent["child-care"];

try {
    JSON.stringify(content);
    console.log("JSON.stringify SUCCEEDED payload is cleanly serializable.");
} catch (e) {
    console.error("JSON.stringify FAILED:");
    console.error(e);
}
