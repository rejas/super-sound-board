import os
import json
import vlc

def load_key_mappings():
    try:
        script_dir = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(script_dir, 'key_mappings.json')
        with open(file_path, 'r') as file:
            key_mappings = json.load(file)
            print("Key Mappings:")
            for sound in key_mappings['sounds']:
                if 'name' in sound['key']:
                    key = sound['key']['name']
                elif 'sequence' in sound['key']:
                    key = sound['key']['sequence']
                else:
                    print(f"No key defined for sound: {sound['file']}")
                    continue
                print(f"Key: {key}, File: {sound['file']}")
            return key_mappings
    except Exception as e:
        print(f"Error loading key mappings: {e}")
        return None

def main():
    key_mappings = load_key_mappings()
    if not key_mappings:
        exit(1)

    sounds_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'sounds')

    try:
        while True:
            key = input("Press a key: ")
            for sound in key_mappings['sounds']:
                if 'name' in sound['key'] and sound['key']['name'] == key:
                    sound_file = os.path.join(sounds_dir, sound['file'])
                    print(f"Playing sound: {sound_file}")
                    p = vlc.MediaPlayer(sound_file)
                    p.play()
                    break
                elif 'sequence' in sound['key'] and sound['key']['sequence'] == key:
                    sound_file = os.path.join(sounds_dir, sound['file'])
                    print(f"Playing sound: {sound_file}")
                    p = vlc.MediaPlayer(sound_file)
                    p.play()
                    break
            else:
                print(f"No sound mapped for key '{key}'")

    except KeyboardInterrupt:
        print("\nExiting...")

if __name__ == "__main__":
    main()

