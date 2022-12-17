# ecovision-backend

## API Routes for User
<table>
<thead>
    <tr>
        <th>Route</th>
        <th>Method</th>
        <th>Payload</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>/api/users/register</code></td>
        <td><code>POST</code></td>
        <td>
            <ul>
                <li><code>name</code></li>
                <li><code>email</code></li>
                <li><code>password</code></li>
            </ul>
        </td>
        <td>This is for user registration</td>
    </tr>
    <tr>
        <td><code>/api/users/login</code></td>
        <td><code>POST</code></td>
        <td>
            <ul>
                <li><code>email</code></li>
                <li><code>password</code></li>
            </ul>
        </td>
        <td>This is for user login</td>
    </tr>
    <tr>
        <td><code>/api/users/logout</code></td>
        <td><code>POST</code></td>
        <td></td>
        <td>This is for user logout</td>
    </tr>
    <tr>
        <td><code>/api/users/details</code></td>
        <td><code>GET</code></td>
        <td>
            <ul>
                <li><code>email</code></li>
            </ul>
        </td>
        <td>This is for user details</td>
    </tr>
</tbody>

<table>