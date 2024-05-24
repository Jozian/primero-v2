# frozen_string_literal: true

# Copyright (c) 2014 - 2023 UNICEF. All rights reserved.

require 'rails_helper'
describe SystemSettings do
  before :each do
    @system_settings = SystemSettings.create(primary_age_range: 'primary',
                                             age_ranges: { 'primary' => [1..2, 3..4] },
                                             reporting_location_config: { field_key: 'owned_by_location',
                                                                          admin_level: 2,
                                                                          admin_level_map: { '1' => ['region'],
                                                                                             '2' => ['district'] } })
  end

  describe 'Validation' do
    context 'with a reporting location' do
      before :each do
        @system_settings.reporting_location_config = ReportingLocation.new(field_key: 'test')
      end

      context 'which is valid' do
        before :each do
          @system_settings.reporting_location_config.admin_level = 2
        end

        it 'is valid' do
          expect(@system_settings).to be_valid
        end
      end
    end

    context 'without a reporting location' do
      it 'is valid' do
        expect(@system_settings).to be_valid
      end
    end

    describe 'with maximum_users' do
      it 'is valid' do
        @system_settings.maximum_users = 50
        expect(@system_settings).to be_valid
      end

      context 'when maximum_users_warning is set' do
        context 'and maximum_users_warning is greater than maximum_users' do
          it 'is invalid' do
            @system_settings.maximum_users = 50
            @system_settings.maximum_users_warning = 55
            expect(@system_settings).to be_invalid
          end
        end

        context 'and maximum_users_warning is equal to maximum_users' do
          it 'is valid' do
            @system_settings.maximum_users = 57
            @system_settings.maximum_users_warning = 55
            expect(@system_settings).to be_valid
          end
        end

        context 'when maximum_users is not a string' do
          it 'is invalid' do
            @system_settings.maximum_users = '57'
            expect(@system_settings).to be_invalid
          end
        end
      end
    end

    context 'without maximum_users' do
      it 'is valid' do
        expect(@system_settings).to be_valid
      end
    end
  end
end
