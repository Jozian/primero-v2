#Create the configuration YML
template ::File.join(node[:primero][:app_dir], 'config', 'backburner.yml') do
  source "backburner.yml.erb"
  variables({
    :environments => [ node[:primero][:rails_env] ],
    :url => "beanstalk://#{node[:primero][:queue][:host]}:#{node[:primero][:queue][:port]}"
  })
  owner node[:primero][:app_user]
  group node[:primero][:app_group]
end

log_base_dir = ::File.join(node[:primero][:log_dir], 'backburner')

directory log_base_dir do
  action :create
  mode '0700'
  owner node[:primero][:app_user]
  group node[:primero][:app_group]
end

backburner_worker_file = "#{node[:primero][:app_dir]}/backburner-worker.sh"

file backburner_worker_file do
  mode '0755'
  owner node[:primero][:app_user]
  group node[:primero][:app_group]
  content <<-EOH
#!/bin/bash
#Launch the Backburner worker for consuming events from the Beanstalkd queue
source #{::File.join(node[:primero][:home_dir],'.rvm','scripts','rvm')}
RAILS_ENV=#{node[:primero][:rails_env]} bundle exec rake  backburner:work
EOH
end

#Launch the rake task via supervisord
supervisor_service 'backburner' do
  command backburner_worker_file
  autostart true
  autorestart true

  redirect_stderr true
  stdout_logfile ::File.join(log_base_dir, 'output.log')
  stdout_logfile_maxbytes '5MB'
  stdout_logfile_backups 0

  user node[:primero][:app_user]
  directory node[:primero][:app_dir]
  numprocs 1
  action [:enable, :restart]
end