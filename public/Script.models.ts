interface Server {
    Ping: number;
    Server: {
        CurrentSession: number;
        Players: number[];
        PlayersOnServer: number;
        Port: number;
        PortTimeCritical: number;
        ServerIp: string;
        Settings: {
            CurrentSession: number;
            Difficulty: number;
            DriverAssist: {
                Preset: number;
                Transmission: number;
                Esp: number;
                SteerAssist: number;
                BrakeAssist: number;
                TractionControl: number;
            }
            ExperienceId: number;
            FlagRules: number;
            FuelUsage: number;
            HasPassword: number;
            Id: number;
            IsRanked: number;
            LiveryId: number[];
            MandatoryPitStop: number;
            MaxNumberOfPlayers: number;
            MechanicalDamage: number;
            PracticeDuration: number;
            QualifyDuration: number;
            QualifyStartMode: number;
            Race1Duration: number;
            Race2Duration: number;
            Race3Duration: number;
            ReverseGridPlaces: number;
            ServerName: string;
            Thumbnail: string;
            TireWear: number;
            TrackLayoutId: number[];
        }
        TimeLeft: number;
    }
}

interface Track {
    "image": {
        "big": string
        "full": string
        "signature": string
        "thumb": string
        "logo": string
    }
    "path": string
    "id": number
    "name": string
    "content_info": {
        "name": string
        "country": {
            "alpha2": string
            "alpha3": string
            "name": string
            "numeric": string
        },
        "track_type": string,
        "number_of_layouts": number,
        "route_params": {
            "country": string,
            "route_name": string,
            "slug": string
        },
        "type": string,
        "description": string
    },
    "cid": number
}

interface Driver {
    Name: string;
    Rating: number;
    Reputation: number;
    Avatar: string;
}