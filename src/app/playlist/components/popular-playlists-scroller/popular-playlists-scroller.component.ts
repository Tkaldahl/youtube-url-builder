import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaylistApiService } from "../../shared/services/playlist-api.service";
import { PlaylistDoc } from "../../shared/models/playlist.models";

@Component({
  selector: "popular-playlists-scroller",
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true,
  providers: [PlaylistApiService],
  templateUrl: "./popular-playlists-scroller.component.html",
  styleUrls: ["./popular-playlists-scroller.component.scss"]
})
export class PopularPlaylistsScrollerComponent implements OnInit {

    popularPlaylists: PlaylistDoc[] = [];
    currentIndex = 0;

    constructor(private playlistService: PlaylistApiService) {}

    ngOnInit(): void {
        // TODO: Populate from server instead of hard-coded target.
        this.popularPlaylists = this.staticPlaylistResults
    }

    get displayedPlaylists(): PlaylistDoc[] {
      return this.popularPlaylists.slice(0, 10);
    }

    // getVisibility(index: number, currentIndex: number): boolean {
    //     return Math.abs(index - currentIndex) <= 1
    // }

    // getOpacity(index: number, currentIndex: number): number {
    //     return Math.abs(index - currentIndex) <= 1 ? 1 : 0
    // }

    // handleScroll(direction: 'next' | 'prev') {
    //   if (direction === 'next' && this.currentIndex < this.displayedPlaylists.length - 1) {
    //     this.currentIndex++;
    //   } else if (direction === 'prev' && this.currentIndex > 0) {
    //     this.currentIndex--;
    //   }
    // }

    // @HostListener('wheel', ['$event'])
    // onScroll(event: WheelEvent) {
    //   if (event.deltaY > 0 && this.currentIndex < this.displayedPlaylists.length - 1) {
    //     this.currentIndex++;
    //   } else if (event.deltaY < 0 && this.currentIndex > 0) {
    //     this.currentIndex--;
    //   }
    // }

    magnificationZone = { top: 100, bottom: 150 }; // Define magnification zone boundaries

    getCardStyle(index: number): any {
      const cardPosition = index * 35; // Card spacing (25px height + 10px margin)
      const { top, bottom } = this.magnificationZone;
  
      if (cardPosition >= top && cardPosition <= bottom) {
        return {
          transform: 'scale(1.25)',
          transition: 'transform 0.2s',
        };
      }
      return {
        transform: 'scale(1)',
        transition: 'transform 0.2s',
      };
    }

    staticPlaylistResults: PlaylistDoc[] = [
        {
            id: '65f9fac8e31cf09e896d043f',
            name: 'Playlist 2024-03-19T20:43:48.548Z',
            playlist: [
                {
                videoId: 'HQmmM_qwG4k',
                timeStamp: 32,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                isTransition: false
                },
                {
                videoId: 'dQw4w9WgXcQ',
                timeStamp: 36,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                isTransition: false
                },
                {
                videoId: '95L_kFa8Rb4',
                timeStamp: 0,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                isTransition: false
                },
                {
                videoId: 'hDnlf4FnLac',
                timeStamp: 15,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                isTransition: false
                }
            ],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0441',
            name: 'Hello World!',
            playlist: [
                {
                isTransition: false,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                timeStamp: 121,
                videoId: 'HQmmM_qwG4k'
                },
                {
                isTransition: false,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                timeStamp: 81,
                videoId: 'dQw4w9WgXcQ'
                },
                {
                isTransition: false,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                timeStamp: 0,
                videoId: '95L_kFa8Rb4'
                },
                {
                isTransition: false,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                timeStamp: 92,
                videoId: 'uITI4DkVRL8'
                },
                {
                isTransition: false,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                timeStamp: 232,
                videoId: '_FrOQC-zEog'
                },
                {
                isTransition: false,
                published: undefined,
                tags: [],
                title: undefined,
                channelTitle: undefined,
                timeStamp: 122,
                videoId: '2PMnJ_Luk_o'
                },
                {
                channelTitle: 'chartrand',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 165,
                title: 'Pink Floyd - Wish You Were Here',
                videoId: 'IXdNnw99-Ic'
                },
                {
                channelTitle: 'Led Zeppelin',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 75,
                title: 'Led Zeppelin - Rock and Roll (Official Audio)',
                videoId: 'D2lSwosw9xY'
                },
                {
                channelTitle: 'DrDreVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 79,
                title: 'Dr. Dre - Still D.R.E. ft. Snoop Dogg',
                videoId: '_CL6n0FJZpk'
                },
                {
                timeStamp: 30,
                isTransition: false,
                videoId: 'gir8BEqAutk',
                title: 'Taylor Swift - Blank Space (Taylor&#39;s Version) (Lyric Video)',
                channelTitle: 'TaylorSwiftVEVO',
                published: undefined,
                tags: [],
                }
            ],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: 'e9e3ea2486f642d9b9fb2d1c',
            name: 'Playlist 2024-03-23T20:01:55.165Z',
            playlist: [
                {
                channelTitle: 'CASCADA',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 80,
                title: 'Cascada - Everytime We Touch (Official video)',
                videoId: 'AV4smtJrIOM'
                },
                {
                channelTitle: 'shakiraVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 68,
                title: 'Shakira - Loba (Official HD Video)',
                videoId: 'C7ssrLSheg4'
                },
                {
                channelTitle: 'AbbaVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 28,
                title: 'Abba - Dancing Queen (Official Music Video Remastered)',
                videoId: 'xFrGuyw1V8s'
                },
                {
                channelTitle: 'BeyonceSasha1',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 55,
                title: 'Beyoncé - Diva',
                videoId: 'rJ61blaQsYg'
                },
                {
                channelTitle: 'XL Recordings',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 17,
                title: 'Vampire Weekend - A-Punk',
                videoId: '_XC2mqcMMGQ'
                },
                {
                channelTitle: 'Cardi B',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 110,
                title: 'Cardi B - WAP feat. Megan Thee Stallion [Official Music Video]',
                videoId: 'hsm4poTWjMs'
                },
                {
                channelTitle: 'RobynVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 71,
                title: 'Robyn - Dancing On My Own (Official Video)',
                videoId: 'CcNo07Xp8aQ'
                },
                {
                channelTitle: 'BeyoncéVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 107,
                title: 'Beyoncé - Crazy In Love ft. JAY Z',
                videoId: 'ViwtNLUqkMY'
                },
                {
                channelTitle: 'LuisFonsiVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 77,
                title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
                videoId: 'kJQP7kiw5Fk'
                },
                {
                channelTitle: 'blink182VEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 15,
                title: 'blink-182 - What&#39;s My Age Again? (Official Music Video)',
                videoId: 'K7l5ZeVVoCA'
                },
                {
                channelTitle: 'PitbullVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 29,
                title: 'Pitbull - Timber (Official Video) ft. Ke$ha',
                videoId: 'hHUbLv4ThOo'
                },
                {
                channelTitle: 'GAYLE',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 52,
                title: 'GAYLE - abcdefu (Official Music Video)',
                videoId: 'NaFd8ucHLuo'
                },
                {
                channelTitle: 'Cardi B',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 44,
                title: 'Cardi B - Bongos (feat. Megan Thee Stallion) [Official Music Video]',
                videoId: 'Ux1f1Q8Zxhk'
                },
                {
                channelTitle: 'Dua Lipa',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 66,
                title: 'Dua Lipa - Dance The Night (From Barbie The Album) [Official Music Video]',
                videoId: 'OiC1rgCPmUQ'
                },
                {
                channelTitle: 'TaylorSwiftVEVO',
                isTransition: false,
                published: undefined,
                tags: [],
                timeStamp: 32,
                title: 'Taylor Swift - Cruel Summer (Official Audio)',
                videoId: 'ic8j13piAhQ'
                },
                {
                timeStamp: 33,
                isTransition: false,
                videoId: 'rputRf_z7Tk',
                title: 'Gracie Abrams - 21 (acoustic)',
                channelTitle: 'GracieAbramsVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 43,
                isTransition: false,
                videoId: 'Ye9f64uIRxE',
                title: 'Chelsea Cutler - Easy (Official Lyric Video)',
                channelTitle: 'Chelsea Cutler',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 76,
                isTransition: false,
                videoId: 'DSViHjXhF14',
                title: 'Maisie Peters - The Last One [Lyric Video]',
                channelTitle: 'Maisie Peters',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 82,
                isTransition: false,
                videoId: 'dJPdkhsr0gU',
                title: 'Noah Kahan, Gracie Abrams - Everywhere, Everything (Official Lyric Video)',
                channelTitle: 'NoahKahanVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 40,
                isTransition: false,
                videoId: 'MACzQc6FlRM',
                title: 'Novo Amor - State Lines (official audio)',
                channelTitle: 'Novo Amor',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 138,
                isTransition: false,
                videoId: 'UgS7vgquBvo',
                title: 'KANA-BOON 『ないものねだり』Music Video',
                channelTitle: 'hiplandmusic',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 32,
                isTransition: false,
                videoId: 'vg-_8tcErAU',
                title: 'Anxious - &quot;Where You Been&quot; (Official Audio)',
                channelTitle: 'Run For Cover Records',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 38,
                isTransition: false,
                videoId: 'Zy6lqgpZP5A',
                title: 'Carly Cosgrove - &quot;The Great Doheny&quot; (Official Video)',
                channelTitle: 'Wax Bodega',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 54,
                isTransition: false,
                videoId: 'gdZLi9oWNZg',
                title: 'BTS (방탄소년단) &#39;Dynamite&#39; Official MV',
                channelTitle: 'HYBE LABELS',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 22,
                isTransition: false,
                videoId: '64T9233ihf8',
                title: 'Bearings &quot;Sway&quot; (Official Music Video)',
                channelTitle: 'Pure Noise Records',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 38,
                isTransition: false,
                videoId: 'JK716RqoUms',
                title: 'Band of Horses - Is There a Ghost [OFFICIAL VIDEO]',
                channelTitle: 'Sub Pop',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 37,
                isTransition: false,
                videoId: 'H1V7CKq27Zs',
                title: 'Dazy - Split (Official Music Video)',
                channelTitle: 'lameorecords',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 33,
                isTransition: false,
                videoId: 'zdfjCivNxGY',
                title: 'Beach Fossils - Down the Line (Official Video)',
                channelTitle: 'BeachFossilsVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 33,
                isTransition: false,
                videoId: '9mLD8FL28Nk',
                title: 'Catfish and the Bottlemen - Soundcheck',
                channelTitle: 'TheBottlemenVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 57,
                isTransition: false,
                videoId: '4KyLzOmiq6o',
                title: 'Sylvan Esso - The Glow (music video)',
                channelTitle: 'SylvanEssoVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 33,
                isTransition: false,
                videoId: 'fye1XtXQn9s',
                title: 'The Flaming Lips - Fight Test [Official Music Video]',
                channelTitle: 'flaminglips',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 167,
                isTransition: false,
                videoId: 'YQX2CsMCB9M',
                title: 'King Gizzard &amp; The Lizard Wizard - Gila Monster',
                channelTitle: 'KingGizzardVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 66,
                isTransition: false,
                videoId: 'vzWds5gWS6c',
                title: 'Viagra Boys — Ain&#39;t Nice',
                channelTitle: 'viagra boys',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 29,
                isTransition: false,
                videoId: '3nZmVy3g3CE',
                title: 'The Mollusk',
                channelTitle: 'Ween - Topic',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 16,
                isTransition: false,
                videoId: '3V6rjyL_63U',
                title: 'Justice - One Night/All Night (Starring Tame Impala) (Official Video)',
                channelTitle: 'Justice',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 28,
                isTransition: false,
                videoId: 'VJ1a70v-44A',
                title: 'Together Pangea - Friend of Nothing (Acoustic)',
                channelTitle: 'Together Pangea',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 51,
                isTransition: false,
                videoId: 'LvHsLdYXfaY',
                title: 'Geese - Cowboy Nudes (Official Music Video)',
                channelTitle: 'Geese',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 87,
                isTransition: false,
                videoId: 'dQw4w9WgXcQ',
                title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
                channelTitle: 'Rick Astley',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 53,
                isTransition: false,
                videoId: 'dZLfasMPOU4',
                title: 'Fountains of Wayne - Stacy&#39;s Mom (Official Music Video)',
                channelTitle: 'FountainsOfWayneVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 95,
                isTransition: false,
                videoId: 'C2cMG33mWVY',
                title: 'OMC - How Bizarre (Official Music Video)',
                channelTitle: 'OMCVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 88,
                isTransition: false,
                videoId: 'p-qfzH0vnOs',
                title: 'Goldfinger - 99 Red Balloons',
                channelTitle: 'GoldfingerVEVO',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 21,
                isTransition: false,
                videoId: 'ZPHl5ZWYdjo',
                title: 'The Lightning II',
                channelTitle: 'Arcade Fire - Topic',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 53,
                isTransition: false,
                videoId: 'AR4lpQWcT5g',
                title: 'George Harrison ~ My Sweet Lord  (High Quality)',
                channelTitle: 'Costantino',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 166,
                isTransition: false,
                videoId: 'PLe3pznz9oM',
                title: 'The Last Agni Kai but it has the Violin Opening you&#39;ve been looking for',
                channelTitle: 'Jafet Meza',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 97,
                isTransition: false,
                videoId: 'Jd9cLU_oixU',
                title: 'RAC - We Belong (ODESZA Remix)',
                channelTitle: 'Majestic Casual',
                published: undefined,
                tags: [],
                },
                {
                timeStamp: 74,
                isTransition: false,
                videoId: 'WccfbPQNMbg',
                title: 'Andrew W.K. - Party Hard',
                channelTitle: 'AndrewWKVEVO',
                published: undefined,
                tags: [],
                }
            ],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0442',
            name: 'Playlist 4!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0443',
            name: 'Playlist 5!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0444',
            name: 'Playlist 6!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0447',
            name: 'Playlist 7!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0448',
            name: 'Playlist 8!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0449',
            name: 'Playlist 9!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0450',
            name: 'Playlist 10!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        },
        {
            id: '65f9fbf6e31cf09e896d0451',
            name: 'Playlist 11!',
            playlist: [],
            coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg",
            transitionVideo: null
        }
    ]
}