/*global define*/
define([
        './defaultValue',
        './Cartesian3',
        './EllipsoidGeometry'
    ], function(
        defaultValue,
        Cartesian3,
        EllipsoidGeometry) {
    "use strict";

    /**
     * A description of a sphere centered at the origin.
     *
     * @alias SphereGeometry
     * @constructor
     *
     * @param {Number} [options.radius=1.0] The radius of the sphere.
     * @param {Number} [options.stackPartitions=64] The number of times to partition the ellipsoid into stacks.
     * @param {Number} [options.slicePartitions=64] The number of times to partition the ellipsoid into radial slices.
     * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
     *
     * @exception {DeveloperError} options.slicePartitions cannot be less than three.
     * @exception {DeveloperError} options.stackPartitions cannot be less than three.
     *
     * @see SphereGeometry#createGeometry
     *
     * @example
     * var sphere = new SphereGeometry({
     *   radius : 100.0,
     *   vertexFormat : VertexFormat.POSITION_ONLY
     * });
     * var geometry = SphereGeometry.createGeometry(sphere);
     */
    var SphereGeometry = function(options) {
        var radius = defaultValue(options.radius, 1.0);
        var radii = new Cartesian3(radius, radius, radius);
        var ellipsoidOptions = {
                radii: radii,
                stackPartitions: options.stackPartitions,
                slicePartitions: options.slicePartitions,
                vertexFormat: options.vertexFormat
        };

        this._ellipsoidGeometry = new EllipsoidGeometry(ellipsoidOptions);
        this._workerName = 'createSphereGeometry';
    };

    /**
     * Computes the geometric representation of a sphere, including its vertices, indices, and a bounding sphere.
     *
     * @param {SphereGeometry} sphereGeometry A description of the sphere.
     * @returns {Geometry} The computed vertices and indices.
     */
    SphereGeometry.createGeometry = function(sphereGeometry) {
        return EllipsoidGeometry.createGeometry(sphereGeometry._ellipsoidGeometry);
    };

    return SphereGeometry;
});
