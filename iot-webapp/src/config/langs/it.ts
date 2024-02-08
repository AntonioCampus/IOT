export default {
    common: {
        date: 'Data',
        zone: 'Zona',
        close: 'Chiudi',
        cancel: 'Annulla',
        detected: 'Rilevato',
        no_detected: 'Non rilevato',
        next_btn: 'Avanti &rarr;',
        success: 'Successo',
        ok: 'Ok',
        error: 'Errore',
        wrong_otp: 'Il codice OTP è errato, per favore riprova più tardi.',
        device: 'Dispositivo',
        confirm: 'Sì, fallo!',
    },
    errors: {
        fetch_data: 'Si è verificato un errore, per favore riprova più tardi!',
    },
    navbar: {
        dashboard: 'DASHBOARD',
        alerts: 'ALLARMI',
        statistics: 'STATISTICHE',
        system: 'SISTEMA',
        admin: 'AMMINISTRAZIONE',
        logout: 'ESCI',
    },
    footer: {
        title: 'Progetto IoT di Antonio Campus e Nicola Deidda',
        university: 'Università di Cagliari',
        year: 'A.A. 2023/2024',
        version: 'Versione',
    },
    login: {
        login_btn: 'Accedi',
        wrong_credentials: 'Sembra che le tue credenziali siano errate! Per favore, riprova.',
        confirm_btn: 'Verifichiamolo!',
        image_alt: 'Credenziali errate!',
    },
    dashboard: {
        overview: 'Panoramica',
        active_zones: 'Zone attive',
        detections_day: 'Rilevazioni/24h',
        manual_overrides: 'Override manuali oggi',
        active_detectors: 'Rilevatori attivi',
        possible_faults: 'Possibili guasti',
        alerts_history: 'Cronologia degli allarmi',
        no_alerts: 'Nessun allarme trovato',
        last_detections: 'Ultime rilevazioni',
        no_detections: 'Nessuna rilevazione trovata',
    },
    alert_card: {
        title: 'Dettagli allarme',
        bird_detected: 'Volatile rilevato',
        image_acquired: 'Immagine acquisita',
    },
    all_alerts: {
        title: 'Tutti gli allarmi',
        no_alerts: 'Nessun allarme trovato',
        filter_lbl: 'Mostra solo allarmi con volatili rilevati',
    },
    statistics: {
        title: 'Statistiche',
        detections: 'Rilevazioni',
        zones: 'Zone',
        no_data: 'Nessun dato disponibile, probabilmente l\'applicazione non è stata ancora configurata.',
        options_automatic: 'Automatico',
        options_override: 'Override',
        months: {
            jan: 'Gen',
            feb: 'Feb',
            mar: 'Mar',
            apr: 'Apr',
            may: 'Mag',
            jun: 'Giu',
            jul: 'Lug',
            aug: 'Ago',
            sep: 'Set',
            oct: 'Ott',
            nov: 'Nov',
            dec: 'Dic',
        },
        detections_today: 'Rilevazioni oggi per rilevatore',
        activations_month: 'Attivazioni attuatori/mese',
        detections_month: 'Rilevazioni/mese',
        alerts_zone: 'Allarmi per zona',
    },
    system: {
        detectors: 'Rilevatori',
        no_detectors: 'Nessun rilevatore trovato',
        actuators: 'Attuatori',
        no_actuators: 'Nessun attuatore trovato',
        zones: 'Zone',
        no_zones: 'Nessuna zona trovata',
        zone_description: 'Descrizione zona',
        add_zone: 'Aggiungi una nuova zona',
        add_detector: 'Aggiungi un nuovo rilevatore',
        add_actuator: 'Aggiungi un nuovo attuatore',
        override: 'Override',
        remove_actuator: 'Rimuovi attuatore',
        no_activity: 'Nessuna attività trovata',
        no_detection: 'Nessuna rilevazione trovata',
        remove_detector: 'Rimuovi rilevatore',
        last_activity: 'Ultima attività',
        last_result: 'Ultimo risultato',
        detection_rate: 'Tasso di rilevazione',
        no_zones_configured: 'Nessuna zona configurata. Per favore aggiungi una nuova zona per iniziare ad utilizzare il sistema.',
    },
    forms: {
        new_detector: 'Imposta un nuovo rilevatore',
        request_id: 'Inserisci l\'ID del nuovo rilevatore',
        invalid_id: 'ID non valido, controlla l\'inserimento e riprova.',
        request_passcode: 'Inserisci il codice di accesso del nuovo rilevatore',
        invalid_passcode: 'Codice di accesso non valido, controlla l\'inserimento e riprova.',
        detector_added: 'Il nuovo rilevatore è stato aggiunto con successo!',
        detector_error: 'Si è verificato un errore durante l\'aggiunta del nuovo rilevatore, riprova più tardi.',
        new_actuator: 'Imposta un nuovo attuatore',
        actuator_added: 'Il nuovo attuatore è stato aggiunto con successo!',
        actuator_error: 'Si è verificato un errore durante l\'aggiunta del nuovo attuatore, riprova più tardi.',
        new_zone: 'Imposta una nuova zona',
        zone_description: 'Inserisci la descrizione della nuova zona',
        invalid_description: 'Descrizione non valida, controlla l\'inserimento e riprova.',
        zone_added: 'La nuova zona è stata aggiunta con successo!',
        zone_error: 'Si è verificato un errore durante l\'aggiunta della nuova zona, riprova più tardi.',
        are_you_sure: 'Sei sicuro?',
        remove_actuator: 'L\'attuatore verrà eliminato definitivamente (naturalmente molti volatili saranno felici)!!',
        deleted_actuator: 'Attuatore eliminato!',
        deleted_actuator_txt: 'L\'attuatore è ora eliminato (e molti volatili sono felici).',
        deleted_detector: 'Rilevatore eliminato!',
        actuator_error_remove: 'Si è verificato un errore durante la rimozione dell\'attuatore, riprova più tardi.',
        remove_detector: 'Il rilevatore verrà eliminato definitivamente (naturalmente molti volatili saranno felici)!!',
        deleted_detector_txt: 'Il rilevatore è ora eliminato (e molti volatili sono felici).',
        detector_error_remove: 'Si è verificato un errore durante la rimozione del rilevatore, riprova più tardi.',
    },
    faults: {
        no_report: 'non ha segnalato alcun dato per le ultime 24 ore.',
        title: 'Panoramica possibili guasti',
    },
    overrides: {
        override_lbl: 'Override in Zona',
        issued_by: 'Emitente',
        title: 'Override',
        override_actuator: 'Sei sicuro di voler eseguire l\'override di questo attuatore?',
        override_title: 'Attuatore sovrascritto!',
        override_txt: 'L\'attuatore è stato sovrascritto con successo!',
        override_error: 'Si è verificato un errore durante l\'override dell\'attuatore, riprova più tardi.',
    },
    users: {
        title: 'Dashboard amministrativa',
        remove_user: 'Rimuovi utente',
        remove_txt: 'Vuoi davvero eliminare l\'utente dall\'applicazione?',
        user_removed: 'L\'utente è stato rimosso con successo!',
        user_error: 'Si è verificato un errore durante la rimozione dell\'utente, riprova più tardi.',
        user_removed_title: 'Utente rimosso',
        user_error_title: 'Errore',
        privileged: 'Utente privilegiato',
        standard: 'Utente standard',
        remove_tooltip: 'Clicca per rimuovere l\'utente dall\'applicazione',
        no_remove: 'Non puoi rimuovere il tuo proprio account!',
        new_user: 'Imposta un nuovo utente',
        new_user_lbl: 'Inserisci il nome utente dell\'utente. Sarà utilizzato per il login.',
        invalid_username: 'Nome utente non valido, controlla l\'inserimento e riprova.',
        add_user: 'Aggiungi utente',
    },
    no_page: {
        message: 'Sembra che alcuni volatili abbiano sabotato questa pagina!',
        submessage: 'O forse hai solo digitato male...'
    },
    otp: {
        otp_code: 'Codice OTP',
        your_otp: 'Il tuo codice OTP è:',
        note: 'Nota',
        expires: 'scadrà tra',
        minutes: 'minuti',
        otp_error: 'Si è verificato un errore durante l\'invio dell\'OTP, riprova più tardi.',
        otp_title: 'Verifichiamo che tu non sia un volatile!',
        otp_text: 'Inserisci il codice OTP ricevuto su Telegram.',
    }
};