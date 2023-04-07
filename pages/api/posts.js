import { getAllPostIds } from '../../lib/posts';

export default function handler(req, res) {
    const paths = getAllPostIds();
    res.status(200).json({ paths });
}