.. ABIThree Documentation documentation master file, created by
   sphinx-quickstart on Mon Jan 10 11:34:10 2022.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to ABIThree Documentation's documentation!
==================================================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

.. toctree::
   :maxdepth: 2
   :caption: Contents:

Guide
============
Class
^^^^^^^
.. js:autoclass:: Scenes(constructor, args[container, numberOfScene, cameraPosition])
   :members:
.. js:autoclass:: ImageLoader(constructor, args[label,dicom_file_paths,scene,camera,container,gui,callbackFunction])
   :members:

LoadModule Functions
^^^^^^^^^^^^^^^^^^^^^^
.. js:autofunction:: loadObjFile(url, scene, camera [, material=null, progressBar=null])
.. js:autofunction:: loadMTLFile(url_mtl, url_obj, scene, camera [, progressBar=null])
.. js:autofunction:: loadGLTFFile(url, scene, camera [, progressBar=null])

Helper
^^^^^^^^^
.. js:autoclass:: CameraHelper(constructor, args[object, prop])
   :members:
.. js:autoclass:: ColorGUIHelper(constructor, args[object, prop])
   :members:


