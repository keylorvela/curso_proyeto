import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { languageOptions: { globals: globals.browser } }, // Add comma here
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    "settings": {
      "react": {
        "version": "18.2"
      }
    }
  },
];
