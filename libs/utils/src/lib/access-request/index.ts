/**
 * This file contains a list of resources that can have a button to let the user request the data.
 * The requestAdress field is the application form adress for requestsing access to the data,
 * and the id is the id of the specific resource.
 */

import { AccessRequest } from './types';

export const accessRequestWhiteList: AccessRequest[] = [
  // Staging
  {
    id: '788dc86c-7e14-3a52-8f9e-2808001fbf44',
    requestAddress: 'https://digdir.apps.tt02.altinn.no/digdir/tilgangssoknad/'
  },
  {
    id: '86e664de-e8b4-355a-bdec-56724eb07900',
    requestAddress:
      'https://digdir.apps.tt02.altinn.no/digdir/tilgangsoknad-svv/'
  },
  {
    id: '8f305377-a3a3-3dde-be33-d5b5d0b8f818',
    requestAddress: 'https://forms.gle/VnBnZwvsWSu51a3V6'
  },
  {
    id: '8b285b05-dd33-31db-a1b6-0cf605bf05dd',
    requestAddress: 'https://soknad.kudaf.no'
  },
  {
    id: 'ecdbd6d4-7026-3731-bd8e-2f15e26221a2',
    requestAddress: 'https://soknad.kudaf.no'
  },
  {
    id: '26a075d7-f92a-381f-8831-291ae8aa63a4',
    requestAddress: 'https://soknad.kudaf.no'
  },
  {
    id: '57cd0ad7-2602-3a3a-894e-fde19b29980e',
    requestAddress: 'https://soknad.kudaf.no'
  },
  // Production
  {
    id: 'e281c8c6-b944-4662-861d-a475e973e393',
    requestAddress: 'https://www.skatteetaten.no/deling/folkeregisteret/intro/'
  },
  {
    id: '95b9c74d-1dd4-3f92-aef2-a6a587b03fb3',
    requestAddress: 'https://digdir.apps.altinn.no/digdir/tilgangssoknad-tenor/'
  }
];
