export const token: string = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTJjYzg1MGEyNmJlMjQxMDM4OWUxNDFmY2VjMWFiNCIsInN1YiI6IjY1ZTMxY2Q4OWVlMGVmMDE2MjZlYzIxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q7lpX4Od2gRvZgMtGHRuaNRIs_0YeNWDQwjkohjmKUk'
export const apiHeader = {
    Authorization: token,
    accept: 'application/json'
}
export const urlApi: string = `https://api.themoviedb.org/3/movie/`;