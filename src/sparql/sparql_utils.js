export const SPARQL_ENDPOINT = "http://localhost:3030/group11_in_memory/sparql";

export const queries = {
  count_friends: {
    label: "Who has how many friends?",
    query: `    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX g11: <http://www.semantic-systems-2018w.org/group11#>
    PREFIX mo: <http://purl.org/ontology/mo/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    
    SELECT ?label (count(?label) as ?Anzahl)
    WHERE {
        ?us a foaf:Person.
        ?friend a foaf:Person;
        g11:knows ?us.
        ?us foaf:name ?label.
    }
    group by ?label`
  },
  known_by_two: {
    label: "What people are known by at least two group members?",
    query: `    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX g11: <http://www.semantic-systems-2018w.org/group11#>
    PREFIX mo: <http://purl.org/ontology/mo/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    
    SELECT ?friend
    WHERE {
        ?friend a foaf:Person;
        g11:knows ?friendKnows.
    } group by ?friend
    having (count(?friendKnows)>1)`
  },
  most_liked_genre: {
    label: "What music genre do team members like most?",
    query: `    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX g11: <http://www.semantic-systems-2018w.org/group11#>
    PREFIX mo: <http://purl.org/ontology/mo/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    
    SELECT ?name ?genre (count(?genre) as ?Anzahl)
    WHERE {
      ?us a foaf:Person.
      ?us foaf:name ?name.
      ?musicArtist a mo:MusicArtist.
          ?us g11:likes ?musicArtist.
          ?musicArtist mo:genre ?genre.
          filter(?us=?uss)
         {
              select ?uss{
                  ?friend a foaf:Person;
                  g11:knows ?uss .
              } group by ?uss
          }
    }group by ?name ?genre order by desc(?Anzahl)
    `
  },
  artists_liked_by_team: {
    label: "Which artists are like by multiple team members?",
    query: `    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX g11: <http://www.semantic-systems-2018w.org/group11#>
    PREFIX mo: <http://purl.org/ontology/mo/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
    
    SELECT ?maName
    WHERE {
      ?ma a mo:MusicArtist;
      g11:likedBy ?oneOfUs;
      foaf:name ?maName.      
    } group by ?maName
    having (count(?oneOfUs)>1)
    `
  },
  most_records_countries: {
    label: "Which country do most record labels come from?",
    query: `    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX g11: <http://www.semantic-systems-2018w.org/group11#>
    PREFIX mo: <http://purl.org/ontology/mo/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
    
    SELECT ?loclabel (count(?loclabel) as ?Anzahl)
    WHERE {
      ?ma a mo:MusicArtist;
      g11:likedBy ?oneOfUs;
      foaf:name ?maName;
    mo:label ?label    .
    SERVICE <http://dbtune.org/musicbrainz/sparql> {
            ?labelInner a mo:Label;
            rdfs:label ?label;
            foaf:based_near ?location.
          ?location rdfs:label ?loclabel.
    }
    } group by ?loclabel ORDER BY DESC(?Anzahl)
    `
  },
};
