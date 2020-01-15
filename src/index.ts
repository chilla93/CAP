//node start up example:   npm start -- -f capture -i 2 -s Mediu
import "reflect-metadata";
import CapController from "./CapController";

// import _ from 'core-js/es7/reflect';

//in order to break npm start from parsing the commandline flags, include '--' before listing the command line options

const cap = new CapController();
cap.start();



//   class IceCreamComponent {
//       @ValidNumber()
//       public flavor!: string;

//       constructor(flav: string){
//         this.flavor = flav;
//       }; 
//   }
  
// console.log("start");
// const i = new IceCreamComponent("vanilla");
// const i2 = new IceCreamComponent("vanilla");
// console.log(`${i.flavor}`);
// i.flavor = "chocolate";
// i2.flavor = "strawberry";
// console.log(`${i.flavor}`);
// console.log(`${i2.flavor}`);
// i2.flavor = "green bean";
// console.log(`${i2.flavor}`);