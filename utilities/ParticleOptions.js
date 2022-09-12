export default {
   background: {
      color: {
         value: '#FAFAFA'
      }
   },
   fpsLimit: 30,
   // interactivity: {
   //     detectsOn: 'canvas',
   //     events: {
   //         onClick: {
   //             enable: true,
   //             mode: 'push'
   //         },
   //         onHover: {
   //             enable: true,
   //             mode: 'repulse'
   //         },
   //         resize: true
   //     },
   //     modes: {
   //         bubble: {
   //             distance: 400,
   //             duration: 2,
   //             opacity: 0.8,
   //             size: 40
   //         },
   //         push: {
   //             quantity: 4
   //         },
   //         repulse: {
   //             distance: 200,
   //             duration: 0.4
   //         }
   //     }
   // },
   particles: {
      color: {
         value: '#999999'
      },
      links: {
         color: '#999999',
         distance: 200,
         enable: true,
         opacity: 0.2,
         width: 1
      },
      collisions: {
         enable: false
      },
      move: {
         direction: 'none',
         enable: true,
         outMode: 'bounce',
         random: false,
         speed: 1,
         straight: false
      },
      number: {
         density: {
            enable: true,
            value_area: 800
         },
         value: 30
      },
      opacity: {
         value: 0.5
      },
      shape: {
         type: 'circle'
      },
      size: {
         random: true,
         value: 5
      }
   },
   detectRetina: true
}
