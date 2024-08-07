export default {
    common: {
        date: 'Date',
        zone: 'Zone',
        close: 'Close',
        cancel: 'Cancel',
        detected: 'Detected',
        no_detected: 'Not detected',
        next_btn: 'Next &rarr;',
        success: 'Success!',
        ok: 'Ok',
        error: 'Error!',
        wrong_otp: 'The OTP code is wrong, please try again later.',
        device: 'Device',
        confirm: 'Yes, do it!',
    },
    errors: {
        fetch_data: 'An error occurred, please try again later!',
    },
    navbar: {
        dashboard: 'DASHBOARD',
        alerts: 'ALERTS',
        statistics: 'STATISTICS',
        system: 'SYSTEM',
        admin: 'ADMIN',
        logout: 'LOGOUT',
    },
    footer: {
        title: 'IoT Project by Antonio Campus & Nicola Deidda',
        university: 'University of Cagliari',
        year: 'A.Y. 2023/2024',
        version: 'Version',
    },
    login: {
        login_btn: 'Login',
        wrong_credentials: 'It seems that your credentials are wrong! Please try again.',
        confirm_btn: "Let's check it out!",
        image_alt: "Wrong credentials!"
    },
    dashboard: {
        overview: 'Overview',
        active_zones: 'Active Zones',
        detections_day: 'Detections/24h',
        manual_overrides: 'Manual overrides today',
        active_detectors: 'Active Detectors',
        possible_faults: 'Possible Faults',
        alerts_history: 'Alerts History',
        no_alerts: 'No alerts found',
        last_detections: 'Last detections',
        no_detections: 'No detections found',
    },
    alert_card: {
        title: 'Alert details',
        bird_detected: 'Bird detected',
        image_acquired: 'Image acquired',
    },
    all_alerts: {
        title: 'All alerts',
        no_alerts: 'No alerts found',
        filter_lbl: 'Show only alerts with bird detected',
    },
    statistics: {
        title: 'Statistics',
        detections: 'Alerts',
        zones: 'Zones',
        no_data: 'No data found, maybe the application is not configured yet.',
        options_automatic: 'Automatic',
        options_override: 'Override',
        months: {
            jan: 'Jan',
            feb: 'Feb',
            mar: 'Mar',
            apr: 'Apr',
            may: 'May',
            jun: 'Jun',
            jul: 'Jul',
            aug: 'Aug',
            sep: 'Sep',
            oct: 'Oct',
            nov: 'Nov',
            dec: 'Dec',
        },
        detections_today: 'Today alerts per detector',
        activations_month: 'Actuators activations/month',
        detections_month: 'Alerts/month',
        alerts_zone: 'Alerts per zone',
    },
    system: {
        detectors: 'Detectors',
        no_detectors: 'No detectors found',
        actuators: 'Actuators',
        no_actuators: 'No actuators found',
        zones: 'Zones',
        no_zones: 'No zones found',
        zone_description: 'Zone description',
        add_zone: 'Add a new zone',
        add_detector: 'Add a new detector',
        add_actuator: 'Add a new actuator',
        override: 'Override',
        remove_actuator: 'Remove actuator',
        no_activity: 'No activity found',
        no_detection: 'No detection found',
        remove_detector: 'Remove detector',
        last_activity: 'Last activity',
        last_result: 'Last result',
        detection_rate: 'Detection rate',
        no_zones_configured: 'No zones configured yet. Please add a new zone to start using the system.',
    },
    forms: {
        new_detector: 'Set a new detector',
        request_id: 'Please enter the id of the new device',
        invalid_id: 'Invalid id, please check your input and try again.',
        request_passcode: 'Please enter the passcode of the new device',
        invalid_passcode: 'Invalid passcode, please check your input and try again.',
        detector_added: 'The new detector has been added successfully!',
        detector_error: 'An error occurred while adding the new detector, please try again later.',
        new_actuator: 'Set a new actuator',
        actuator_added: 'The new actuator has been added successfully!',
        actuator_error: 'An error occurred while adding the new actuator, please try again later.',
        new_zone: 'Set a new zone',
        zone_description: 'Please enter the description of the new zone',
        invalid_description: 'Invalid description, please check your input and try again.',
        zone_added: 'The new zone has been added successfully!',
        zone_error: 'An error occurred while adding the new zone, please try again later.',
        are_you_sure: 'Are you sure?',
        remove_actuator: "The actuator will be deleted forever (of course many birds will be happy)!!",
        deleted_actuator: 'Actuator deleted!',
        deleted_actuator_txt: 'The actuator is now deleted (and many birds are happy).',
        deleted_detector: 'Detector deleted!',
        actuator_error_remove: 'An error occurred while removing the actuator, please try again later.',
        remove_detector: "The detector will be deleted forever (of course many birds will be happy)!!",
        deleted_detector_txt: 'The detector is now deleted (and many birds are happy).',
        detector_error_remove: 'An error occurred while removing the detector, please try again later.',
    },
    faults: {
        no_report: 'has not reported any data for the last 24 hours.',
        title: 'Possible faults overview',
        no_faults: 'No faults found',
    },
    overrides: {
        override_lbl: 'Override in Zone',
        issued_by: 'Issued by',
        title: 'Overrides',
        no_overrides: 'No overrides found',
        override_actuator: 'Are you sure you want to override this actuator?',
        override_title: 'Actuator overrided!',
        override_txt: 'The actuator has been overrided successfully!',
        override_error: 'An error occurred while overriding the actuator, please try again later.',
    },
    users: {
        title: 'Admin dashboard',
        remove_user: 'Remove user',
        remove_txt: 'Do you really want to delete the user from the application?',
        user_removed: 'The user has been removed successfully!',
        user_error: 'An error occurred while removing the user, please try again later.',
        user_removed_title: 'User removed',
        user_error_title: 'Error',
        privileged: 'Privileged user',
        standard: 'Standard user',
        remove_tooltip: 'Click to remove user from the application',
        no_remove: 'You cannot remove your own account!',
        new_user: 'Set a new user',
        new_user_lbl: 'Please enter the username of the user. It will be used for login.',
        invalid_username: 'Invalid username, please check your input and try again.',
        add_user: 'Add user',
        new_user_psw: 'Please enter the password of the user. It will be used for login.',
        invalid_password: 'Invalid password, please check your input and try again.',
        give_privileges: 'Give admin privileges to the user?',
        yes_give: 'Yes, give them!',
        added_user_title: 'User added',
        added_user_txt: 'The user has been added successfully.',
        add_error: 'An error occurred while adding the user, please try again later.',
    },
    no_page: {
        message: 'It seems that some birds sabotaged this page!',
        submessage: 'Or maybe you just mistyped...'
    },
    otp: {
        otp_code: 'OTP code',
        your_otp: 'Your OTP code is:',
        note: 'Note',
        expires: 'it will expires in',
        minutes: 'minutes',
        otp_error: 'An error occurred while sending the OTP, please try again later.',
        otp_title: 'Let\'s verify you are not a bird!',
        otp_text: 'Please enter the OTP code you received on Telegram.',
    }
}