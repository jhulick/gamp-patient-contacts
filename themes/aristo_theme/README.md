Cappuccino's Aristo for SproutCore! 

Ported by [Levi McCallum](http://levimccallum.com/).

Install
-------

First cd into your app and do this:

	mkdir themes
	git clone git://github.com/stillmotion/sproutcore-aristo.git themes/aristo_theme

Now add this to Buildfile:

	config :all,
	  :theme => :aristo_theme
	
	config :aristo_theme, 
	  :theme_name => 'aristo-theme'
	
Status
------

**Currently Supported**

* ButtonView
* SegmentedView
* SelectButtonView

**TODO**

* ButtonView
	* Smaller sizes (only regular-size is supported)
	* Multiple styles (only "square" is currently supported)
	* Default selection style (currently remains grey)
* SegmentedView
	* Needs disabled styles
	* Force left/right aligning
* SelectButtonView
	* Needs CSS cleanup
	* Needs Disabled style
	* Selection menu needs styling
* CheckBoxView
* RadioView
* SliderView
* Menu design
	* This one's tricky, since SproutCore has no "menu". Needs some thought.
* Scroller
* Modal Panes (Aristo Window feel without the "browser" look)


Attribution
-----------

Aristo is an open source UI distributed as part of the [Cappuccino Web Application Framework](http://cappuccino.org)
and specifically designed for the cross platform challenges applications face today.
It is a collaborative effort by [280 North, Inc.](http://280north.com/) and [Sofa](http://www.madebysofa.com/)
and released under the Creative Commons Attribution Share-Alike License.

You can view this license here: [http://creativecommons.org/licenses/by-sa/3.0/us/](http://creativecommons.org/licenses/by-sa/3.0/us/)

You can find out more about Aristo by visiting [http://cappuccino.org/aristo](http://cappuccino.org/aristo).

* 280 North, Inc., [280north.com](http://280north.com)
* Sofa, [madebysofa.com](http://madebysofa.com/)