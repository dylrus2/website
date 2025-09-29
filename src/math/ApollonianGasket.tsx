import { Complex } from "mathjs";
import { useEffect, useRef } from "react";
import * as math from 'mathjs';
class Circle {
    x: number;
    y: number;
    k: number;
    z: Complex;
    radius: number;
    constructor(x: number, y: number, k: number) {
        this.x = x;
        this.y = y;
        this.k = k
        this.z = math.complex(x, y);
        this.radius = math.abs(1 / k);
    }

}

function checkTangent(c1: Circle, c2: Circle, eps: number) {
    let distanceBetweenCircles = math.abs(math.subtract(c1.z, c2.z));
    let r12: number = math.abs(math.subtract(distanceBetweenCircles, math.add(c1.radius, c2.radius))) as number;
    let r21: number = math.abs(math.subtract(distanceBetweenCircles, math.abs(math.subtract(c2.radius, c1.radius)))) as number;
    return r12 < eps || r21 < eps;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function recursiveCircle(c1: Circle, c2: Circle, c3: Circle, canvas: HTMLCanvasElement, depth: number) {
    if (depth <= 0) {
        return
    }
    let k12 = math.multiply(c1.k, c2.k);
    let k13 = math.multiply(c1.k, c3.k);
    let k23 = math.multiply(c2.k, c3.k);
    let kSqrt: number = math.sqrt(math.add(k12, k13, k23)) as number;
    let posK = math.add(c1.k, c2.k, c3.k, 2 * kSqrt);

    let z12: Complex = math.multiply(c1.z, c2.z) as Complex;
    let z13: Complex = math.multiply(c1.z, c3.z) as Complex;
    let z23: Complex = math.multiply(c2.z, c3.z) as Complex;

    let kz12: Complex = math.multiply(k12, z12) as Complex;
    let kz13: Complex = math.multiply(k13, z13) as Complex;
    let kz23: Complex = math.multiply(k23, z23) as Complex;
    let p2zSqrt = math.multiply(2, math.sqrt(math.add(kz12, kz13, kz23))) as Complex;
    let n2zSqrt = math.multiply(-2, math.sqrt(math.add(kz12, kz13, kz23))) as Complex;

    let kz1: Complex = math.multiply(c1.k, c1.z) as Complex;
    let kz2: Complex = math.multiply(c2.k, c2.z) as Complex;
    let kz3: Complex = math.multiply(c3.k, c3.z) as Complex;

    let pz4: Complex = math.divide(math.add(kz1, kz2, kz3, p2zSqrt), posK) as Complex;
    let nz4: Complex = math.divide(math.add(kz1, kz2, kz3, n2zSqrt), posK) as Complex;

    let pCircle = new Circle(pz4.re, pz4.im, posK);
    let nCircle = new Circle(nz4.re, nz4.im, posK);
    let eps = 1;
    if (checkTangent(pCircle, c1, eps) && checkTangent(pCircle, c2, eps) && checkTangent(pCircle, c3, eps) && pCircle.radius > eps) {
        drawCircle(pCircle, canvas);
        recursiveCircle(c1, c2, pCircle, canvas, depth - 1);
        recursiveCircle(c1, c3, pCircle, canvas, depth - 1);
        recursiveCircle(c2, c3, pCircle, canvas, depth - 1);
    }
    if (checkTangent(nCircle, c1, eps) && checkTangent(nCircle, c2, eps) && checkTangent(nCircle, c3, eps) && nCircle.radius > eps) {
        drawCircle(nCircle, canvas);
        recursiveCircle(c1, c2, nCircle, canvas, depth - 1);
        recursiveCircle(c1, c3, nCircle, canvas, depth - 1);
        recursiveCircle(c2, c3, nCircle, canvas, depth - 1);
    }

}
function drawCircle(circle: Circle, canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext("2d");
    if (ctx != null) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.stroke();
    }
}

function ApollonianGasket() {
    const myCanvas = useRef(null)
    useEffect(() => {
        if (myCanvas.current) {
            const canvas: HTMLCanvasElement = myCanvas.current;
            canvas.width = 600;
            canvas.height = 600;
            let halfWidth = canvas.width / 2;
            let halfHeight = canvas.height / 2;
            let c1: Circle = new Circle(halfWidth, halfHeight, -1 / halfHeight);
            let c2: Circle = new Circle(halfWidth, halfHeight - halfHeight / 2, 2 / halfHeight);
            let c3: Circle = new Circle(halfWidth, halfHeight + halfHeight / 2, 2 / halfHeight);
            drawCircle(c1, canvas);
            drawCircle(c2, canvas);
            drawCircle(c3, canvas);
            recursiveCircle(c1, c2, c3, canvas, 10);
        }
    })
    return <div style={{ height: '100%', width: '100%' }}>
        <h2 className="text-center mb-5">Apollonian Gasket</h2>
        <div className="d-flex justify-content-center">
            <canvas width={600} height={600} ref={myCanvas}>
                Sorry, your browser does not support canvas.
            </canvas>
        </div>
        <div>
            <h3 className="mt-5 mb-3 text-center">What is an Apollonian Gasket?</h3>
            <div style={{ width: '75%', marginLeft: '15%', marginRight: '15%' }}>
                <div className="text-center">
                    <p>
                        The Apollonian gasket is a fractal structure in geometry named after Apollonius of Perga,
                        a Greek mathematician who lived in the third century BCE. This construction begins with three
                        mutually tangent circles and recursively fills the remaining spaces with smaller circles,
                        each tangent to its neighbors. The construction follows a specific process: starting with
                        three circles that touch each other pairwise, there exist exactly two circles tangent to all three,
                        and focusing on the interior configuration, each new circle creates three additional curvilinear
                        triangular spaces where the process repeats indefinitely. Apollonius's theorem, which relates
                        the curvatures of four mutually tangent circles, governs this construction through the
                        Descartes Circle Theorem: (k₁ + k₂ + k₃ + k₄)² = 2(k₁² + k₂² + k₃² + k₄²). This formula allows for
                        the calculation of each successive circle's size, transforming the geometric pattern into a
                        computationally tractable mathematical object.
                    </p>
                    <p>
                        The Apollonian gasket possesses fractal properties that distinguish it from classical geometric figures.
                        It has a Hausdorff dimension of approximately 1.3057, which falls between one and two dimensions.
                        The total area covered by the infinite collection of circles converges to the area of the initial curvilinear
                        triangle. The gasket contains infinitely many circles with sizes following power law distribution,
                        where small circles outnumber large ones. The residual set—the points not covered by any circle—forms a
                        Cantor-like set of measure zero yet uncountably infinite cardinality. The structure demonstrates self-similarity
                        across all scales, meaning that zooming into any region reveals patterns similar to the overall structure.
                    </p>

                    <p>
                        When constructed with integer curvatures, Apollonian gaskets create what are known as integral Apollonian
                        gaskets, where all subsequently generated circles also have integer curvatures due to the Descartes Circle Theorem.
                        These configurations have generated research in number theory, particularly concerning which prime numbers
                        appear as curvatures, which integers can appear in such packings, and the symmetry groups of these structures.
                        Research has addressed questions in arithmetic geometry and the theory of quadratic forms, including the Local-Global
                        Conjecture for Apollonian gaskets. The structure connects ancient Greek geometry with contemporary research
                        in fractal geometry, number theory, and related mathematical fields.
                    </p>
                </div>
            </div>
        </div>
    </div>
}
export default ApollonianGasket;