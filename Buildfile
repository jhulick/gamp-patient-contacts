# ===========================================================================
# Project:   Patients
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, "sproutcore/animation", :forms, :scui], :load_fixtures => true

config :all, :theme => :aristo_theme
config :aristo_theme, :theme_name => 'aristo-theme'

#proxy '/server/', :to => 'localhost:8000', :url=> '/patients/'