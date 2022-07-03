import { Request, Response, Router } from 'express';
import { GHTOKEN } from '../config';
import axios from 'axios'
import cheerio from 'cheerio';
import User from '../types/User'

const router = Router();

let headers =   {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + GHTOKEN
}

router.get('/:user', async(req: Request, res: Response) =>   {
    let uri: string = "https://github.com/" + req.params.user
    let uriApi: string = "https://api.github.com/users/" + req.params.user

    const { data, status } = await axios.get<User>(uriApi, { headers: headers })

    await axios.get(uri)
    .then(async (response) => {
        let $ = cheerio.load(response.data);

        const markdownProfile = $('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-main > div:nth-child(2) > div > div.Box.mt-4 > div');

        res.send({
            user: data.login,
            md: markdownProfile.html(),
        })
    })
    .catch((error) => {
        console.log(error + status);
    });
})
export default router
