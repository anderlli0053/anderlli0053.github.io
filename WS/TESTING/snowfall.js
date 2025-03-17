// snowfall.js

particlesJS("snowfall", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "image", // Change this to "image" for snowflake-like particles
            image: {
                src: createSnowflakeSVG(), // Use the dynamically created SVG snowflake
                width: 30, // Adjust the width of the snowflake image
                height: 30, // Adjust the height of the snowflake image
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: false, // Disable line connections between particles
        },
        move: {
            enable: true,
            speed: 6,
            direction: "bottom",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
});

// Function to create an asterisk (*) shaped SVG snowflake
function createSnowflakeSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("width", "30");
    svg.setAttribute("height", "30");

    // Creating the arms of the asterisk
    for (let i = 0; i < 6; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "15");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", "15");
        line.setAttribute("y2", "30");
        line.setAttribute("stroke", "#fff");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("transform", `rotate(${i * 60} 15 15)`); // Rotate each arm by 60 degrees
        svg.appendChild(line);
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgURL = "data:image/svg+xml;utf8," + encodeURIComponent(svgData);

    return svgURL;
}
