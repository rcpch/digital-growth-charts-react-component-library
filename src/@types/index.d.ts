// import icon from '../images/icon.png';
// import ukca from '../images/ukca.png';

declare module "\*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module "\*.jpg" {
    const content: string;
    export default content;
  }
  
  declare module "\*.png" {
    const content: string;
    export default content;
  }
  
  declare module "\*.json" {
    const content: string;
    export default content;
  }